// * backend/routes/api/loadouts.js

// Local Module Imports
const { Loadout, User } = require('../../db/models');
const { requireSessionAuth } = require('../../utils/auth');
const { devLog, devWarn } = require('../../utils/devLogger');
// Chalk Color Aliases
const { green, red } = require('chalk');
// Dev Logger File Path
const PATH = 'routes/api/loadouts.js';

/**
 * Controller for all `/api/loadouts` Express routes.
 * 
 * Includes the following routes:
 * 1. `GET /api/loadouts`: Get Recent Loadouts
 * 2. `GET /api/loadouts/:loadoutId`: Get Loadout Details By ID
 * 3. `POST /api/loadouts`: Create New Loadout
 * 4. `PUT /api/loadouts/:loadoutId`: Edit Loadout Data
 * 5. `DELETE /api/loadouts/:loadoutId`: Delete Loadout
 * @file `/backend/routes/api/loadouts.js`
 */
const loadouts = require('express').Router();

/**
 * * GET /api/loadouts
 * Retrieves the ten most recently created Loadouts & their owners. No error is thrown if the list
 * is empty, as this is expected to be handled on the frontend.
 */
loadouts.get('/', async (_req, res, next) => {
    /** Define how many Loadouts can be returned in a single query. */
    const limit = 10;

    /** Construct the query. */
    const query = {
        include: [
            { model: User }
        ],
        limit,
        order: [['createdAt', 'DESC']]
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
                if(typeof loadout[key] === 'string' && !['name', 'description'].includes(key))
                    loadout[key] = JSON.parse(loadout[key]);
            
            // Return the parsed Loadout.
            return loadout;
        });

        // Return the parsed Loadout list.
        devLog(PATH, `Retrieved ${list.length} loadouts` + green(' successfully'));
        return res.json({ list, limit });
    }).catch((err) => next(err));
});

/**
 * * GET /api/loadouts/:loadoutId
 * Retrieves a specific Loadout's data, as well as the data of its owner. If no Loadout is found,
 * a 404 is returned, but no error is thrown, as this is expected to be handled on the frontend.
 */
loadouts.get('/:loadoutId', async (req, res, next) => {
    // Destructured Parameters
    const { loadoutId } = req.params;

    /** Return the Loadout specified by the `loadoutId`. Handle any errors. */
    return await Loadout.findByPk(loadoutId, {
        include: [{ model: User }]
    }).then((loadout) => {
        // If the Loadout does not exist, return a 404, but do not throw an error.
        if(!loadout) {
            devWarn(PATH, `Loadout ${loadoutId} ` + red('not found') + 
                '. If the Loadout exists, this is a bug!');
            return res.status(404).json(null);
        }

        // Convert the Loadout into a JSON object.
        loadout = loadout.toJSON();
        
        // Iterate through the Loadout, parsing all String values into JSON except for the Loadout
        // name & description.
        for(let key in loadout) {
            if(['name', 'description'].includes(key))
                continue;

            if(typeof loadout[key] === 'string')
                loadout[key] = JSON.parse(loadout[key]);
        }

        // If `ancientWeaponEquipped` or `splitterEquipped` are null, set them appropriately.
        // ? Implemented to compensate for the migration added 1/17/2025.
        if(loadout['flags'].ancientWeaponEquipped === null)
            loadout['flags'].ancientWeaponEquipped = 
                Object.values(loadout['enhancements']).includes(2);
        if(loadout['flags'].splitterEquipped === null)
            loadout['flags'].splitterEquipped = 
                Object.values(loadout['enhancements']).includes(24);
        
        // Add the `enhancements.selected` attribute.
        // TODO potentially make the frontend deal with this
        loadout['enhancements'].selected = null;

        // Return the final Loadout object.
        devLog(PATH, `Loadout ${loadoutId} found ` + green('successfully'));
        return res.json(loadout);
    }).catch((err) => next(err));
});

/** 
 * * POST /api/loadouts
 * Creates a new Loadout & returns its data.
 */
loadouts.post('/', requireSessionAuth, async (req, res, next) => {
    // Destructured Parameters
    const { flags, name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, 
            consumables } = req.body;
    
    /** 
     * Delete the `enhancements.selected` attribute, as it is not needed for the database. It will
     * be re-added when the loadout is read back in later.
     * TODO potentially make the frontend deal with this
     */
    delete enhancements.selected;
    
    /** 
     * Create & return the Loadout, having stringified the JSON data of applicable attributes.
     * Handle any errors.
     */
    return await Loadout.create({
        userId: req.user.id,
        flags: JSON.stringify(flags),
        name,
        shipId,
        enhancements: JSON.stringify(enhancements),
        primaryWeapons: JSON.stringify(primaryWeapons),
        secondaryWeapons: JSON.stringify(secondaryWeapons),
        devices: JSON.stringify(devices),
        consumables: JSON.stringify(consumables)
    }).then((loadout) => {
        // Return the new Loadout's data.
        devLog(PATH, 'New loadout created ' + green('successfully') + ` at ID ${loadout.id}`);
        return res.status(201).json(loadout);
    }).catch((err) => next(err));
});

/**
 * * PUT /api/loadouts/:loadoutId
 * Edits the data of an existing Loadout. Verifies that the user sending the request is the owner
 * of the Loadout. Returns a success message if no errors occur.
 */
loadouts.put('/:loadoutId', requireSessionAuth, async (req, res, next) => {
    // Destructured Parameters
    const { loadoutId } = req.params;
    const { flags, name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, 
            consumables } = req.body;
    const { id } = req.user;
    
    /** 
     * Find, update, & save the specified Loadout, then return a success message. Handle any
     * errors.
     * ? `toJSON()` is not needed here, because `set()` is a Sequelize function.
     */
    return await Loadout.findByPk(loadoutId)
    .then(async (loadout) => {
        // Requests from unauthorized Users should be intercepted and thrown as an error.
        if(id !== loadout.userId) {
            const err = new Error('Not authorized to edit this Loadout.');
            err.title = 'Unauthorized User';
            err.errors = { message: 'Current User is not authorized to edit this Loadout.' };
            err.status = 403;
            throw err;
        }

        // Modify the returned Loadout.
        loadout.set({
            flags: JSON.stringify(flags),
            name,
            shipId,
            enhancements: JSON.stringify(enhancements),
            primaryWeapons: JSON.stringify(primaryWeapons),
            secondaryWeapons: JSON.stringify(secondaryWeapons),
            devices: JSON.stringify(devices),
            consumables: JSON.stringify(consumables)
        });

        // Save the modified Loadout.
        await loadout.save();

        // Return the success message.
        devLog(PATH, `Loadout ${loadoutId} updated ` + green('successfully'));
        return res.json({ message: 'Successfully edited' });
    }).catch((err) => next(err));
});

/**
 * * DELETE /api/loadouts/:loadoutId
 * Deletes an existing Loadout. Verifies that the user sending the request is the owner of the
 * Loadout. Returns a success message if no errors occur.
 */
loadouts.delete('/:loadoutId', requireSessionAuth, async (req, res, next) => {
    // Destructured Parameters
    const { loadoutId } = req.params;
    const { id } = req.user;

    /** Find & destroy the specified Loadout. Handle any errors. */
    return await Loadout.findByPk(loadoutId)
    .then(async (loadout) => {
        // Requests from unauthorized Users should be intercepted and thrown as an error.
        if(id !== loadout.userId) {
            const err = new Error('Not authorized to delete this Loadout.');
            err.title = 'Unauthorized User';
            err.errors = { message: 'Current User is not authorized to delete this Loadout.' };
            err.status = 403;
            throw err;
        }

        // Destroy the returned Loadout.
        await loadout.destroy();

        // Return the success message.
        devLog(PATH, `Loadout ${loadoutId} deleted ` + green('successfully'));
        return res.json({ message: 'Successfully deleted' });
    }).catch((err) => next(err));
});

/** Export the branch. */
module.exports = loadouts;