// Sequelize: Users Seed File
'use strict';

// Node Module Imports
const bcrypt = require('bcryptjs');
// Local Module Imports
const { User } = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (_queryInterface, _Sequelize) {
    await User.bulkCreate([
        {
            email: 'demo@aa.io',
            username: 'Demo-lition',
            hashedPassword: bcrypt.hashSync('password'),
            firstName: 'Tavish',
            lastName: 'DeGroot'
        },
        {
            email: 'user1@aa.io',
            username: 'FakeUser1',
            hashedPassword: bcrypt.hashSync('password2'),
            firstName: 'Fake',
            lastName: 'User'
        },
        {
            email: 'user2@aa.io',
            username: 'FakeUser2',
            hashedPassword: bcrypt.hashSync('password3'),
            firstName: 'Faker',
            lastName: 'User'
        }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
        username: { [Sequelize.Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
