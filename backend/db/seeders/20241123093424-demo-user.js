'use strict';
// * backend/db/seeders/20241123093424-demo-user.js
// * Sequelize: Users Seed File

// Node Module Imports
const bcrypt = require('bcryptjs');
// Local Module Imports
const { User } = require('../models');

/** In production, ensure Sequelize refers to the schema in the .env file. */
let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

/**
 * Export the seeder.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** Forward Seed: Add Data to 'Users' Table */
    async up (_queryInterface, _Sequelize) {
        await User.bulkCreate([
            {
                email: 'hive@aa.io',
                username: 'HIVEUnit',
                hashedPassword: bcrypt.hashSync('172a]vlo0k')
            },
            {
                email: 'user1@aa.io',
                username: 'AdamRoslin',
                hashedPassword: bcrypt.hashSync('X5;d$U]oCT')
            },
            {
                email: 'user2@aa.io',
                username: 'Maurice',
                hashedPassword: bcrypt.hashSync('I|5F6!T7Ad')
            },
            {
                email: 'info@wildcharger.xyz',
                username: 'WildCharger',
                hashedPassword: bcrypt.hashSync('L|N*C_p?8g')
            }
        ], { validate: true });
    },

    /** Backward Seed: Remove Data from 'Users' Table */
    async down (queryInterface, Sequelize) {
        options.tableName = 'Users';
        return queryInterface.bulkDelete(options, {
            username: { [Sequelize.Op.in]: ['HIVEUnit', 'AdamRoslin', 'Maurice', 'WildCharger'] }
        }, {});
    }
};
