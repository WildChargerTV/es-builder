// * backend/routes/api/users.js

// Node Module Imports
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// Local Module Imports
const { Loadout, User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const { devLog, devWarn } = require('../../utils/devLogger');
const { validateSignup } = require('../../utils/validation');
// Chalk Color Aliases
const { green, red } = require('chalk');
// Dev Logger File Path
const PATH = 'routes/api/users.js';

/** 
 * Controller for all `/api/users` Express routes.
 * 
 * Includes the following routes:
 * 1. `GET /api/users/:userId`: Get User Details By ID
 * 2. `GET /api/users/:userId/loadouts`: Get User Loadouts
 * 3. `POST /api/users`: User Signup Route (Create New User)
 * @file `/backend/routes/api/users.js`
 */
const users = require('express').Router();

/**
 * * GET /api/users/:userId
 * Retrieves a specific User's ID & Username. If no User is found, a 404 is returned, but no error
 * is thrown, as this is expected to be handled on the frontend.
 */
users.get('/:userId', async (req, res, next) => {
    // Destructured Parameters
    const { userId } = req.params;

    /** Return the User specified by the `userId`. Handle any errors. */
    return await User.findByPk(userId)
    .then((user) => {
        // If the User does not exist, return a 404, but do not throw an error.
        if(!user) {
            devWarn(PATH, `User ${userId} ` + red('not found') + 
                '. If the User exists, this is a bug!');
            return res.status(404).json(null);
        }

        // Convert the User to a JSON object.
        user = user.toJSON();

        // Return the final User object.
        devLog(PATH, `User ${userId} found ` + green('successfully'));
        return res.json(user);
    }).catch((err) => next(err));
});

/**
 * * GET /api/users/:userId/loadouts
 * Retrieves a User's Loadouts. If any exist, also safely returns the User's ID & Username. Does
 * not reveal any personally identifying information.
 */
users.get('/:userId/loadouts', async (req, res, next) => {
    // Destructured Parameters
    const { userId } = req.params;

    /** Create a variable to hold returned User data from the query. */
    let user;

    /** Construct the query. Include Loadout User data. */
    const query = {
        include: [{ model: User }],
        order: [['createdAt', 'DESC']],
        where: {
            userId: { [Op.eq]: userId }
        }
    };

    /** Return the list of Loadouts as specified by the query. Handle any errors. */
    return await Loadout.findAll(query)
    .then(async (list) => {
        // Map through the returned list, preparing the data to be returned.
        list = list.map((loadout) => {
            // Convert the Loadout to a JSON object.
            loadout = loadout.toJSON();

            // Parse the string values in the Loadout, except for its name & description.
            for(let key in loadout)
                if((typeof loadout[key]) === 'string' && !['name', 'description'].includes(key))
                    loadout[key] = JSON.parse(loadout[key]);

            // If not already, populate the `user` variable declared earlier.
            if(!user)
                user = loadout.User;
            
            // Return the parsed Loadout.
            return loadout;
        });

        // Return the parsed Loadout list.
        devLog(PATH, `Retrieved ${list.length} loadouts ` + green('successfully'));
        return res.json({ list, user });
    }).catch((err) => next(err));
});

/** 
 * * POST /api/users
 * The User Signup route. Validates input data, then returns the created User. Signups are blocked
 * if a User is already logged in.
 */
users.post('/', validateSignup, async (req, res, next) => {
    // Destructured Parameters
    const { email, password, username } = req.body;

    /** Block signups if a user is currently logged in. */
    if(req.user !== null) {
        const err = new Error('Cannot sign up a user while logged in.');
        err.title = 'User Error';
        err.errors = { message: 'Unable to sign up: You are currently logged in. This is a bug!' };
        err.status = 403;
        next(err);
    }

    /** Hash the provided password. */
    const hashedPassword = bcrypt.hashSync(password);

    /** Create & return the new User. Handle any errors. */
    return await User.create({ email, username, hashedPassword })
    .then(async (user) => {
        // Extract all of the User's non-personally-identifying information into an object.
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username
        };

        // Apply the `safeUser` data to the JWT token cookie.
        await setTokenCookie(res, safeUser);

        // Return the `safeUser` data.
        devLog(PATH, 'User signup ' + green('SUCCESS') + ` at ID ${user.id}`);
        return res.json({ user: safeUser });
    }).catch((err) => next(err));
});

/** Export the branch. */
module.exports = users;