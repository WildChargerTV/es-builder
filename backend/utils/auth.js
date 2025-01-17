// * backend/utils/auth.js
// ? Creates user authentication helper functions that will be used within all applicable routes.

// Node Module Imports
const jwt = require('jsonwebtoken');
// Local Module Imports
const { devLog, devErr } = require('./devLogger');
const { adminKey, environment, jwtConfig } = require('../config');
const { User } = require('../db/models');
// Chalk Color Aliases
const { green, red, yellow } = require('chalk');
// Dev Logger File Path
const PATH = 'utils/auth.js';

// Grab the secret key and default expiration date from the config.
const { secret, expiresIn } = jwtConfig;
// Determine if the current environment is development or production.
const isProd = environment === 'production';

/** 
 * When a user logs in or signs up, a JWT (JSON Web Token) cookie must be set in the browser.
 * Given response data and the session user data, this function creates a JWT based on the
 * app's secret key. This JWT is then set as an HTTP-only browser cookie named `token`.
 * 
 * This function assumes the user data has already been verified, and has no error handling.
 * @function `setTokenCookie`
 * @requires {@linkcode devLog} {@linkcode environment} {@linkcode jwtConfig}
 * @param {object} res The response body of an Express middleware.
 * @param {{ id: number, email: string, username: string }} user The user data to convert.
 * @returns {string} The JWT token.
**/
const setTokenCookie = (res, user) => {
    /** Create the token. The expiration date is currently set to one week. */
    const token = jwt.sign(
        { data: user },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    /** Apply the token to the `token` cookie, and impose the required constraints. */
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // Expiration date converted to milliseconds
        httpOnly: true, // The token cannot be read by JavaScript
        secure: isProd,
        sameSite: isProd && 'Lax'
    });

    /** Return the token. */
    devLog(PATH, 'Token cookie has been updated ' + green('successfully'));
    return token;
};

/** 
 * Certain authenticated routes will require the identity of the current session user. This
 * middleware parses the JWT cookie and inserts the necessary data into `req.user`. Also useful for
 * maintaining session data between website visits.
 * 
 * Most errors handled here are only logged in development, and never sent to the Express app's
 * default error handler. The only exception to this is when the token is successfully verified,
 * but has no User ID. This is treated as a critical error.
 * @function `restoreUser`
 * @requires {@linkcode jwtConfig}
 * @param {object} req The request body of an Express middleware.
 * @param {object} res The response body of an Express middleware.
 * @param {Function} next The function telling Express to move on to the next middleware.
 * @see {@linkcode requireSessionAuth} for functionality regarding session authentication.
**/
const restoreUser = (req, res, next) => {
    // Destructured Parameters
    const { token } = req.cookies;

    /** Pre-emptively set `req.user` to null. */
    req.user = null;

    /** Verify the destructured token, then move on to the next middleware. */
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        // Handle token verification errors.
        if(err) {
            // If the error is because of no token, then there is no current Session User, which is
            // acceptable behavior. Anything else should be considered unexpected behavior. Either
            // way, log the event in development.
            err.message = 'jwt must be provided'
            ? devLog(PATH, 'User restoration ' + red('failed') + ' due to nonexistent token')
            : devErr(PATH, 'User restoration ' + red('failed') + '. See below for details', err);

            // Move on to the next middleware.
            return next();
        }
        // If there is no ID inside the payload data, this error cannot be handled.
        else if(!jwtPayload.data.id) {
            // Clear the token cookie.
            res.clearCookie('token');
            next(new Error('Parsed JWT data has no User ID'));
        }
        
        // Destructure the ID from the payload data.
        const { id } = jwtPayload.data;

        // Find a valid user based on the destructured ID, and apply it to `req.user`.
        req.user = await User.findByPk(id, {
            attributes: { include: ['email', 'createdAt', 'updatedAt'] }
        }).then(devLog(PATH, 'Current user ' + green('restored') + ` using parsed ID ${id}`))
        .catch((userErr) => {
            err = userErr;
            res.clearCookie('token');
            return null;
        });

        // Move on to the next middleware if no errors occurred whilst fetching the user.
        return err ? next(err) : next();
    });
};

/**
 * Session authentication requires that *any User* be logged into the app. This middleware function
 * ensures this is the case. If no User is logged in, an error is thrown. Session authentication
 * outcome is logged in development.
 * 
 * Authentication can be bypassed if a valid admin key is presented in the request body.
 * @function `requireSessionAuth`
 * @param {object} req The request body of an Express middleware.
 * @param {object} _res The response body of an Express middleware. Not used in this function.
 * @param {Function} next The function telling Express to move on to the next middleware.
 * @see {@linkcode restoreUser} for functionality related to the data of the current Session User.
**/
const requireSessionAuth = (req, _res, next) => {
    const { overrideKey } = req.body;

    /** If there is no Session User, pass an error to the default error handler. */
    if(!req.user && (!overrideKey || overrideKey !== adminKey)) {
        devLog(PATH, yellow('Session authentication requested, result: ') + red('FAIL'));
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = { message: 'Session authentication is required' };
        err.status = 401;
        return next(err);
    }

    /** Move on to the next middleware. */
    devLog(PATH, yellow('Session authentication requested, result: ') + green('SUCCESS')); 
    return next();
};

/** Export the middleware functions. */
module.exports = { setTokenCookie, restoreUser, requireSessionAuth };