// * backend/routes/api/session.js

// Node Module Imports
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// Local Module Imports
const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const { devLog, devWarn, devErr } = require('../../utils/devLogger');
const { validateLogin } = require('../../utils/validation');
// Chalk Color Aliases
const { green, red } = require('chalk');
// Dev Logger File Path
const PATH = 'routes/api/session.js';

/** 
 * Controller for all `/api/session` Express routes.
 * 
 * Includes the following routes:
 * 1. `GET /api/session`: Get Current User Details
 * 2. `POST /api/session`: User Login Route
 * 3. `DELETE /api/session`: User Logout Route
 * @file `/backend/routes/api/session.js`
 */
const session = require('express').Router();

/** 
 * GET /api/session
 * Retrieves the current Session User's data. Unlike `GET /api/users/:userId`, also returns the 
 * User's Email.
 */
session.get('/', (req, res) => {
    /** If there is no Session User, return null. */
    if(!req.user) 
        return res.json({ user: null });

    /** Extract and return the necessary data from `req.user`. */
    const { id, email, username } = req.user;
    return res.json({ user: { id, email, username } });
});

/** 
 * POST /api/session
 * The User Login route. Validates input data, then returns the specified User.
 */
session.post('/', validateLogin, async (req, res, next) => {
    // Destructured Parameters
    const { credential, password } = req.body;

    /** Try to find a User based on either the provided Username or Email. Ignore scope. */
    const foundUser = await User.unscoped().findOne({
        where: {[Op.or]: {
            username: credential,
            email: credential
        }}
    });

    /** Verify that the Password is valid. */
    const verifiedPassword = foundUser?.hashedPassword
    && bcrypt.compareSync(password, foundUser.hashedPassword.toString());

    /** If no User was found or the Password was invalid, throw an error. */
    if(!foundUser || !verifiedPassword) {
        devWarn(PATH, 'User login ' + red('FAIL'));
        const err = new Error('Login failed');
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        err.status = 401;
        return next(err);
    }

    /** Apply the User's ID, Email, and Username to the JWT token cookie. */
    const { id, email, username } = foundUser;
    await setTokenCookie(res, { id, email, username });

    /** Return the User's ID, Email, and Username. */
    devLog(PATH, 'User login ' + green('SUCCESS'));
    return res.json({ user: { id, email, username } });
});

/** 
 * DELETE /api/session
 * The User Logout route. If no User exists, a faux error (not sent to the default error handler)
 * is returned with status code 400. Returns a success message otherwise.
 */
session.delete('/', (req, res, next) => {
    /** If this route was called without a User, throw an error. */
    if(!req.user) {
        devErr(PATH, 'Attempted to log out a nonexistent user!', 
            new Error('Attempted to log out a null user'));
        return res.status(400).json({ message: 'failure' });
    }
        
    /** Clear the JWT token cookie. */
    res.clearCookie('token');

    /** Return a success message. */
    devLog(PATH, 'User logout ' + green('SUCCESS'));
    return res.json({ message: 'success' });
})

/** Export the branch. */
module.exports = session;