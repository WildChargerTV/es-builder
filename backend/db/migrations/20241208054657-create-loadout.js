'use strict';
// * backend/db/migrations/20241208054657-create-loadout.js
// * Sequelize: Loadouts Migration File 1
// ? As a reminder, this is a representation of the data actually inserted into the table.
// ! FINALIZED - DO NOT MODIFY

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
            /** ID - Integer Field, Primary Key, Auto-Incremented, Not Nullable */
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            /** User ID - Integer Field, Not Nullable */
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            /** Name - String Field, Not Nullable */
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            /** Ship ID - Integer Field, Not Nullable */
            shipId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            /** Enhancements - String Field, Not Nullable */
            enhancements: {
                allowNull: false,
                type: Sequelize.STRING
            },
            /** Primary Weapons - String Field (Limit 512 Characters), Not Nullable */
            primaryWeapons: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            /** Secondary Weapons - String Field (Limit 512 Characters), Not Nullable */
            secondaryWeapons: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            /** Devices - String Field (Limit 512 Characters), Not Nullable */
            devices: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            /** Consumables - String Field (Limit 512 Characters), Not Nullable */
            consumables: {
                allowNull: false,
                type: Sequelize.STRING(512)
            },
            /** Created At - Date Field (Default Value: `CURRENT_TIMESTAMP`), Not Nullable */
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: Sequelize.DATE
            },
            /** Updated At - Date Field (Default Value: `CURRENT_TIMESTAMP`), Not Nullable */
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