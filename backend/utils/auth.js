// * backend/utils/auth.js
// Creates user authentication helper functions that will be used within all applicable routes.

// Node Module Imports
const jwt = require('jsonwebtoken');
// Local Module Imports
const { devLog, devWarn, devErr } = require('./devLogger');
const { environment, jwtConfig } = require('../config');
const { User } = require('../db/models');
// Chalk Color Aliases
const { green, red, yellow } = require('chalk');

// Grab the secret key and default expiration date from the config.
const { secret, expiresIn } = jwtConfig;
// Determine if the current environment is development or production.
const isProd = environment === 'production';
// Define the file path (for dev logger).
const PATH = 'utils/auth.js';

/** 
 * When a user logs in or signs up, a JWT (JSON Web Token) cookie must be set in the browser.
 * Given response data and the session user data, this function creates a JWT based on the
 * app's secret key. This JWT is then set as an HTTP-only browser cookie named `token`.
 * @function setTokenCookie
 * @param res 
**/
const setTokenCookie = (res, user) => {
    // Create the token.
    // The expiration date is set to one week.
    const { id, email, username } = user;
    const safeUser = { id, email, username };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    // Set the `token` cookie to the new token, and impose the required constraints.
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd && 'Lax'
    });

    // Return the token.
    devLog(PATH, 'Token cookie has been updated');
    return token;
}

/** 
 * Certain authenticated routes will require the identity of the current session user. This
 * middleware parses the JWT cookie and inserts the necessary data into `req.user`. Also useful
 * for maintaining session data between website visits.
 * @function restoreUser
 * @see {@linkcode requireSessionAuth} for functionality regarding session authentication.
**/
const restoreUser = (req, res, next) => {
    // Grab the cookie from which the data will be parsed.
    const { token } = req.cookies;

    // Pre-emptively set the user to null.
    req.user = null;

    // Verify the parsed token.
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        // If an error was encountered, move on to the next middleware.
        // * Typically this is triggered if no JWT token exists yet.
        if(err) {
            if(err.message === 'jwt must be provided')
                devLog(PATH, 'User restoration ' + red('failed') + ' due to nonexistent token');
            else devWarn(PATH, 'User restoration ' + red('failed') + '. See below for details', err);
            return next();
        }

        // Try to grab a valid user from the id in the token.
        // If no valid user is found, the token is cleared.
        try {
            const { id } = jwtPayload.data;
            req.user = await User.findByPk(id, {
                attributes: { include: ['email', 'createdAt', 'updatedAt'] }
            });
            devLog(PATH, 'Current user ' + green('restored'));
        } catch(e) {
            devErr(PATH, 'User restoration ' + red('failed') + ', clearing token. See below for details', e);
            res.clearCookie('token');
        }

        // Move on to the next middleware.
        return next();
    });
}

/**
 * Session authentication requires that *any user* be logged into the app. This middleware
 * function ensures this is the case. If no user is logged in, an error is thrown. Session
 * authentication outcome is logged in development.
 * 
 * @see {@linkcode restoreUser} for functionality related to the data of the specific current user.
**/
const requireSessionAuth = (req, _res, next) => {
    if(!req.user) {
        devLog(PATH, yellow('Session authentication requested, result: ') + red('FAIL'));
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = { message: 'Session authentication is required' };
        err.status = 401;
        return next(err);
    }

    devLog(PATH, yellow('Session authentication requested, result: ') + green('SUCCESS')); 
    return next();
}

// Export the functions.
module.exports = { setTokenCookie, restoreUser, requireSessionAuth };