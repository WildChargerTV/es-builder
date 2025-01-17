'use strict';
// * backend/db/migrations/20241208054657-create-loadout.js
// * Sequelize: Loadouts Migration File 1
// ? As a reminder, this is a representation of the data actually inserted into the table.

/** In production, ensure Sequelize refers to the schema in the .env file. */
let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;


/** 
 * Export the migration.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** Forward Migration: Create Table 'Loadouts' */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Loadouts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            shipId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            enhancements: {
                allowNull: false,
                type: Sequelize.STRING
            },
            primaryWeapons: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            secondaryWeapons: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            devices: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            consumables: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE
            }
        }, options);
    },

    /** Backward Migration: Drop 'Loadouts' Table */
    async down(queryInterface, _Sequelize) {
        options.tableName = 'Loadouts';
        return queryInterface.dropTable(options);
    }
};