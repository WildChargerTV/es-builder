// * backend/app.js
// The root of the Express app. All middlewares & routes ultimately lead here.

// Node Module Imports
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { ValidationError } = require('sequelize');
require('express-async-errors');
// Local Module Imports
const { environment } = require('./config');
const routes = require('./routes');
const { devWarn, devErr } = require('./utils/devLogger');

// Determine if the current environment is development or production.
const isProd = environment === 'production';
// Define the file path (for dev logger).
const PATH = 'app.js';

/**
 * The core Express app. It alone holds the entire database on its shoulders.
 * @type {Express} 
 */
const app = express();

/** 
 * Connect all of the necessary middlewares:
 * 1. `morgan`: Logs info about requests & responses.
 * 2. `cookie-parser`: Parses cookies.
 * 3. `express.json`: Parses JSON bodies of applicable requests.
 * 4. `cors`: Enables Cross-Origin Resource Sharing in development. In production, all app
 *    resources will come from the same origin.
 * 5. `helmet`: Sets a variety of headers to better secure the app.
 * 6. `csurf`: Sets the _csrf token cookie and creates the `req.csrfToken` method.
 */
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
if(!isProd) app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(csurf({
    cookie: {
        secure: isProd,
        sameSite: isProd && 'Lax',
        httpOnly: true // CSRF Token cannot be read by JavaScript
    }
}));

// Connect the router controller.
app.use(routes);

/** Error Handler
 *  If any backend route passes an error into `next()`, this will be invoked immediately, bypassing
 *  any other routes. 
 * 
 *  The expectation is that the passed-in error object has enough details of its own to be properly
 *  organized by the Error Formatter. However, if non-unique errors of a shared nature need to have
 *  a more unified information set, it should be set up here.
 * 
 ** See `utils/validation.js` for the `express-validator` error handler.
**/
app.use((err, _req, _res, next) => {
    // All `ValidationError`s are from Sequelize, and should be intercepted here.
    if(err instanceof ValidationError) {
        const errors = {};
        for(let error of err.errors)
            errors[error.path] = error.message;
        err.title = 'Validation Error';
        err.errors = errors;
    }

    // If the error lacks required data, fill it in here.
    if(!err.title) {
        err.title = 'Server Error';
        devWarn(PATH, 'An error was passed in without a title!');
    }
    if(!err.message) {
        err.message = 'Server Error';
        devWarn(PATH, 'An error was passed in without a message!');
    }
    if(!err.errors) {
        err.errors = { message: 'An internal error occurred.' };
        devWarn(PATH, 'An error was passed in with an empty errors object!');
    }
    if(!err.status) {
        err.status = 500;
        devWarn(PATH, 'An error was passed in without a status code!')
    }

    // Pass the error through to the Error Formatter.
    next(err);
});

/** Error Formatter
 *  Once all necessary error data has been set, this will format the data into something palatable
 *  and sufficiently readable for the server response.
 * 
 *  In production, the error stack trace will not be visible.
 * 
 ** This should be the last middleware in the app. Do not place ANYTHING after this.
**/
app.use((err, _req, res, _next) => {
    if(isProd) console.error(err);
    else devErr(PATH, err.message, err);
    const { title, message, errors, stack } = err;
    res.status(err.status).json({ title, message, errors, stack: isProd ? null : stack });
});

// Export the app.
module.exports = app;