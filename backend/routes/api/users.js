// * backend/routes/api/users.js

// Node Module Imports
const bcrypt = require('bcryptjs');
// Local Module Imports
const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const { devLog } = require('../../utils/devLogger');
const { validateSignup } = require('../../utils/validation');
// Chalk Color Aliases
const { green } = require('chalk');

// Define the file path (for dev logger).
const PATH = 'routes/api/users.js';

/** 
 * Controller for all `/api/users` Express routes.
 * 
 * Includes the following routes:
 * 1. `POST /api/users`: User Signup
 */
const users = require('express').Router();

/** 
 * POST /api/users
 * The user signup route.
**/
users.post('/', validateSignup, async (req, res) => {
    // Take the data from the request body, hash the password, and make a new user.
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    // Extract the new user's id, email, and username.
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    // Update the token cookie and return the extracted user data.
    await setTokenCookie(res, safeUser);
    devLog(PATH, 'User signup ' + green('SUCCESS'));
    return res.json({ user: safeUser });
});

/** Export the branch. */
module.exports = users;