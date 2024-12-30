// * backend/routes/api/customEquippables.js

const { CustomEquippable } = require('../../db/models');
const { requireSessionAuth } = require('../../utils/auth');
const { devLog, devErr } = require('../../utils/devLogger');
const { green } = require('chalk');

const customEquippables = require('express').Router();
const PATH = 'routes/api/customEquippables.js';

customEquippables.get('/:customEquippableId', async (req, res, next) => {
    const { customEquippableId } = req.params;

    let customEquippable;
    try {
        customEquippable = await CustomEquippable.findByPk(customEquippableId)
            .then((result) => result.toJSON());
        devLog(PATH, `Custom equippable ${customEquippableId} found ` + green('successfully'));

        customEquippable.stats = JSON.parse(customEquippable.stats);
        
        return res.json({ ...customEquippable });
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }
});

customEquippables.post('/', requireSessionAuth, async (req, res, next) => {
    const { equippableType, equippableId, stats } = req.body;

    let customEquippable;
    try {
        customEquippable = await CustomEquippable.create({
            userId: req.user.id,
            equippableType,
            equippableId,
            stats: JSON.stringify(stats)
        });
        devLog(PATH, 'New custom equippable created ' + green('successfully') + ` at ID ${customEquippable.id}`);
    } catch(err) {
        devErr(PATH, err.message, err);
        return next(err);
    }

    return res.status(201).json(customEquippable);
});

/** Export the branch. */
module.exports = customEquippables