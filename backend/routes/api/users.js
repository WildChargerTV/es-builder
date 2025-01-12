// * backend/routes/api/users.js

// Node Module Imports
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
// Local Module Imports
const { Loadout, User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
const { devLog, devWarn, devErr } = require('../../utils/devLogger');
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
 * GET /api/users/:userId
 */
users.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    let user;
    try {
        user = await User.findByPk(userId)
        .then((result) => result.toJSON());
        devLog(PATH, `User ${userId} found ` + green('successfully'));
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }
    
    return res.json(user);
})

/**
 * GET /api/users/:userId/loadouts
 */
users.get('/:userId/loadouts', async (req, res) => {
    const { userId } = req.params;

    let user;

    const query = {
        attributes: [
            'id', 'name', 'shipId', 'enhancements', 'primaryWeapons', 'secondaryWeapons', 'devices', 
            'consumables', 'createdAt', 'updatedAt'
        ],
        include: [{ model: User }],
        order: [['createdAt', 'DESC']],
        where: {
            userId: { [Op.eq]: userId }
        }
    };

    const list = await Loadout.findAll(query)
    .then(async (result) => {
        const arr = [];

        for await (const loadout of result) {
            const json = loadout.toJSON();
            if(json.id === null) continue;

            for(let key in json)
                if(typeof json[key] === 'string' && !['name'].includes(key))
                    json[key] = JSON.parse(json[key]);
            
            if(!user)
                user = loadout.User;

            delete loadout.User;
            arr.push(json);
        }

        arr.length > 0
        ? devLog(PATH, `Retrieved ${arr.length} loadouts belonging to user ID ${userId}` + green(' successfully'))
        : devWarn(PATH, `Retrieval was successful; however, user ID ${userId} has no loadouts.`)
        return arr;
    });

    return res.json({ list, user });
});

/** 
 * POST /api/users
 * The user signup route.
**/
users.post('/', validateSignup, async (req, res) => {
    // Take the data from the request body, hash the password, and make a new user.
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    // Extract the new user's id, email, and username.
    const safeUser = {
        id: user.id,
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