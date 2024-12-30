'use strict';
// * backend/db/seeders/20241208054945-demo-custom-equippable.js
// * Sequelize: Custom Equippables Seed File

const { CustomEquippable } = require('../models');

/** In production, ensure Sequelize refers to the schema in the .env file. */
let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

/** 
 * Export the seeder.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** Forward Seed: Add Data to 'CustomEquippables' Table */
    async up (_queryInterface, _Sequelize) {
        await CustomEquippable.bulkCreate([
            {
                userId: 4,
                equippableType: "Primary",
                equippableId: 2,
                stats: "{\"Hull DPS\":96,\"Shield DPS\":80,\"Energy Consumption\":6.5,\"Range\":1150}"
            }
        ], { validate: true });
    },

    /** Backward Seed: Remove Data from 'CustomEquippables' Table */
    async down (queryInterface, Sequelize) {
        options.tableName = 'CustomEquippables';
        return queryInterface.bulkDelete(options, {
            userId: { [Sequelize.Op.in]: [1] }
        }, {});
    }
};
