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
                email: 'demo@aa.io',
                username: 'Demo-lition',
                hashedPassword: bcrypt.hashSync('password')
            },
            {
                email: 'user1@aa.io',
                username: 'FakeUser1',
                hashedPassword: bcrypt.hashSync('password2')
            },
            {
                email: 'user2@aa.io',
                username: 'FakeUser2',
                hashedPassword: bcrypt.hashSync('password3')
            }
        ], { validate: true });
    },

    /** Backward Seed: Remove Data from 'Users' Table */
    async down (queryInterface, Sequelize) {
        options.tableName = 'Users';
        return queryInterface.bulkDelete(options, {
            username: { [Sequelize.Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
        }, {});
    }
};
