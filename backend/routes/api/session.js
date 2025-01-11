// * backend/routes/api/session.js
// Controller for all `/api/session` Express routes.

// Node Module Imports
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// Local Module Imports
const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const { devLog, devWarn } = require('../../utils/devLogger');
const { validateLogin } = require('../../utils/validation');
// Chalk Color Aliases
const { green, red } = require('chalk');

// Define the file path (for dev logger).
const PATH = 'routes/api/session.js';

/** ### `/api/session` Route Controller
 *  @file `/backend/routes/api/session.js`
 *  @description Includes the following routes:
 *  1. `GET /api/session` - Fetch Current User
 *  2. `POST /api/session` - User Login
 *  3. `DELETE /api/session` - User Logout
**/
const session = require('express').Router();

/** GET /api/session
 *  Fetch the current session user. 
**/
session.get('/', (req, res) => {
    // If there is no session user, return null.
    if(!req.user) return res.json({ user: null });

    // Extract the necessary data from req.user and return it as an object.
    const { id, email, username } = req.user;
    return res.json({ user: { id, email, username } });
});

/** POST /api/session
 *  The user login route.
**/
session.post('/', validateLogin, async (req, res, next) => {
    // Grab the username/email & password from the request body.
    const { credential, password } = req.body;

    // Try to find a user based on either the provided username or email.
    const foundUser = await User.unscoped().findOne({
        where: {[Op.or]: {
            username: credential,
            email: credential
        }}
    });

    // Verify that the password is valid.
    const verifiedPassword = foundUser?.hashedPassword
    ? bcrypt.compareSync(password, foundUser.hashedPassword.toString())
    : false;

    // If either no user was found or the password was invalid, return an error.
    if(!foundUser || !verifiedPassword) {
        devWarn(PATH, 'User login ' + red('FAIL'));
        const err = new Error('Login failed');
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        err.status = 401;
        return next(err);
    }

    // Create a new session cookie with the valid user data.
    const { id, firstName, lastName, email, username } = foundUser;
    await setTokenCookie(res, { id, email, username });

    // Return the user in JSON.
    devLog(PATH, 'User login ' + green('SUCCESS'));
    return res.json({ user: { id, firstName, lastName, email, username } });
});

/** DELETE /api/session
 *  The user logout route.
**/
session.delete('/', (_req, res) => {
    res.clearCookie('token');
    devLog(PATH, 'User logout ' + green('SUCCESS'));
    return res.json({ message: 'success' });
})

// Export the branch.
module.exports = session;