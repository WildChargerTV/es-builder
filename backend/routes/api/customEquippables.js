// * backend/routes/api/customEquippables.js

// Local Module Imports
const { CustomEquippable } = require('../../db/models');
const { requireSessionAuth } = require('../../utils/auth');
const { devLog, devWarn, devErr } = require('../../utils/devLogger');
// Chalk Color Aliases
const { green, red } = require('chalk');
// Dev Logger File Path
const PATH = 'routes/api/customEquippables.js';

/**
 * Controller for all `/api/custom-equippables` Express routes.
 * 
 * Includes the following routes:
 * 1. `GET /api/custom-equippables/:customEquippableId`: Get Custom Equippable By ID
 * 2. `POST /api/custom-equippables`: Create New Custom Equippable
 */
const customEquippables = require('express').Router();

/**
 * GET /api/custom-equippables/:customEquippableId
 * Retrieves a specific Custom Equippable's data. If no Custom Equippable is found, a 404 is 
 * returned, but no error is thrown, as this is expected to be handled on the frontend.
 */
customEquippables.get('/:customEquippableId', async (req, res, next) => {
    // Destructured Parameters
    const { customEquippableId } = req.params;

    /** Return the Custom Equippable specified by the `customEquippableId`. Handle any errors. */
    return await CustomEquippable.findByPk(customEquippableId)
    .then((customEquippable) => {
        // If the Custom Equippable does not exist, return a 404, but do not throw an error.
        if(!customEquippable) {
            devWarn(PATH, `Custom Equippable ${customEquippableId} ` + red('not found') +
            '. If the Custom Equippable exists, this is a bug!');
            return res.status(404).json(null);
        }

        // Convert the Custom Equippable into a JSON object.
        customEquippable = customEquippable.toJSON();

        // Parse the Custom Equippable's stats.
        customEquippable.stats = JSON.parse(customEquippable.stats);

        // Return the final Custom Equippable object.
        devLog(PATH, `Custom Equippable ${customEquippableId} found ` + green('successfully'));
        return res.json({ ...customEquippable });
    }).catch((err) => next(err));
});

/**
 * POST /api/custom-equippables
 * Creates a new Custom Equippable & returns its data.
 */
customEquippables.post('/', requireSessionAuth, async (req, res, next) => {
    // Destructured Parameters
    const { equippableType, equippableId, stats } = req.body;

    /**
     * Create & return the Custom Equippable, having stringified the JSON data of its stats. Handle
     * any errors.
     */
    return await CustomEquippable.create({
        userId: req.user.id,
        equippableType,
        equippableId,
        stats: JSON.stringify(stats)
    }).then((customEquippable) => {
        // Return the new Custom Equippable's data.
        devLog(PATH, 'New custom equippable created ' + green('successfully') + 
            ` at ID ${customEquippable.id}`);
        return res.status(201).json(customEquippable);
    }).catch((err) => next(err));
});

/** Export the branch. */
module.exports = customEquippables;