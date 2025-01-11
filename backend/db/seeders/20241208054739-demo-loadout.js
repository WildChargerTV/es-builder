'use strict';
// * backend/db/seeders/20241208054739-demo-loadout.js
// * Sequelize: Loadouts Seed File

const { Loadout } = require('../models');

/** In production, ensure Sequelize refers to the schema in the .env file. */
let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

/** 
 * Export the seeder.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** Forward Seed: Add Data to 'Loadouts' Table */
    async up (_queryInterface, _Sequelize) {
        await Loadout.bulkCreate([
            {
                userId: 1,
                name: "PREPPED FOR ANYTHING",
                shipId: 0,
                enhancements: "{\"0\":19,\"1\":20,\"2\":22}",
                primaryWeapons: "{\"0\":{\"id\":11,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"1\":{\"id\":6,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"2\":{\"id\":null,\"mods\":null}}",
                secondaryWeapons: "{\"0\":\"0x1\",\"1\":\"1x7\",\"2\":\"7x6\"}",
                devices: "{\"0\":{\"id\":59,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"1\":{\"id\":14,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"2\":{\"id\":26,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"3\":{\"id\":45,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"4\":{\"id\":null,\"mods\":null}}",
                consumables: "{\"0\":\"16x2\",\"1\":\"11x4\",\"2\":\"13x1\",\"3\":\"14x1\",\"4\":null}"
            },
            {
                userId: 4,
                name: "IT'S ENHANCED",
                shipId: 3,
                enhancements: "{\"0\":4,\"1\":18,\"2\":8}",
                primaryWeapons: "{\"0\":{\"id\":\"c1\",\"mods\":{\"0\":5,\"1\":15,\"2\":null,\"3\":null}}}",
                secondaryWeapons: "{\"0\":\"2x12\",\"1\":\"9x10\"}",
                devices: "{\"0\":{\"id\":62,\"mods\":{\"0\":32,\"1\":32,\"2\":33,\"3\":33}},\"1\":{\"id\":26,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"2\":{\"id\":80,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"3\":{\"id\":53,\"mods\":{\"0\":null,\"1\":null,\"2\":null,\"3\":null}},\"4\":{\"id\":73,\"mods\":{\"0\":30,\"1\":30,\"2\":30,\"3\":30}},\"5\":{\"id\":14,\"mods\":{\"0\":28,\"1\":28,\"2\":28,\"3\":30}}}",
                consumables: "{\"0\":\"11x4\",\"1\":\"6x4\",\"2\":\"13x1\",\"3\":\"23x1\"}"
            }
        ], { validate: true });
    },

    /** Backward Seed: Remove Data from 'Loadouts' Table */
    async down (queryInterface, Sequelize) {
        options.tableName = 'Loadouts';
        return queryInterface.bulkDelete(options, {
            userId: { [Sequelize.Op.in]: [1, 4] }
        }, {});
    }
};
