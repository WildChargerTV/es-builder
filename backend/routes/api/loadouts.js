// * backend/routes/api/loadouts.js

// Local Module Imports
const { Loadout, User } = require('../../db/models');
const { requireSessionAuth } = require('../../utils/auth');
const { devLog, devErr } = require('../../utils/devLogger');
// Chalk Color Aliases
const { green } = require('chalk');

const loadouts = require('express').Router();
const PATH = 'routes/api/loadouts.js';

/**
 * GET /api/loadouts
 */
loadouts.get('/', async (_req, res) => {
    const limit = 10;
    const query = {
        attributes: [
            'id', 'name', 'shipId', 'enhancements', 'primaryWeapons', 'secondaryWeapons', 'devices', 
            'consumables', 'createdAt', 'updatedAt'
        ],
        include: [
            { model: User }
        ],
        limit,
        order: [['createdAt', 'DESC']]
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
            
            arr.push(json);
        }

        devLog(PATH, `Retrieved ${arr.length} loadouts` + green(' successfully'));
        return arr;
    });
    return res.json({
        list,
        limit
    });
});

/**
 * GET /api/loadouts/:loadoutId
 */
loadouts.get('/:loadoutId', async (req, res, next) => {
    const { loadoutId } = req.params;

    let loadout;
    try {
        loadout = await Loadout.findByPk(loadoutId, {
            include: [{ model: User }]
        }).then((result) => result.toJSON());
        devLog(PATH, `Loadout ${loadoutId} found ` + green('successfully'));

        for(let key in loadout)
            if(typeof loadout[key] === 'string' && !['name'].includes(key)) 
                loadout[key] = JSON.parse(loadout[key]);
        
        loadout['enhancements'].selected = null;
        return res.json({ ...loadout });
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }
});

/** 
 * POST /api/loadouts
 */
loadouts.post('/', requireSessionAuth, async (req, res, next) => {
    const { name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables } = req.body;
    delete enhancements.selected;

    let loadout;
    try {
        loadout = await Loadout.create({
            userId: req.user.id,
            name,
            shipId,
            enhancements: JSON.stringify(enhancements),
            primaryWeapons: JSON.stringify(primaryWeapons),
            secondaryWeapons: JSON.stringify(secondaryWeapons),
            devices: JSON.stringify(devices),
            consumables: JSON.stringify(consumables)
        });
        devLog(PATH, 'New loadout created ' + green('successfully') + ` at ID ${loadout.id}`);
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }

    return res.status(201).json(loadout);
});

/**
 * PUT /api/loadouts/:loadoutId
 */
loadouts.put('/:loadoutId', requireSessionAuth, async (req, res, next) => {
    const { loadoutId } = req.params;
    const { name, shipId, enhancements, primaryWeapons, secondaryWeapons, devices, consumables } = req.body;

    let loadout;
    try {
        loadout = await Loadout.findByPk(loadoutId);
        loadout.set({
            name,
            shipId,
            enhancements: JSON.stringify(enhancements),
            primaryWeapons: JSON.stringify(primaryWeapons),
            secondaryWeapons: JSON.stringify(secondaryWeapons),
            devices: JSON.stringify(devices),
            consumables: JSON.stringify(consumables)
        });
        await loadout.save();
        devLog(PATH, `Loadout ${loadoutId} updated ` + green('successfully'));
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }
});

/**
 * DELETE /api/loadouts/:loadoutId
 * TODO USER authentication needed
 */
loadouts.delete('/:loadoutId', requireSessionAuth, async (req, res, next) => {
    const { loadoutId } = req.params;

    let loadout;
    try {
        loadout = await Loadout.findByPk(loadoutId);
        await loadout.destroy();
        devLog(PATH, `Loadout ${loadoutId} deleted ` + green('successfully'));
        return res.json({ message: 'Successfully deleted' });

    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }
});

/** Export the branch. */
module.exports = loadouts;