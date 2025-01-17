'use strict';
// * backend/db/migrations/20241208054927-create-custom-equippable.js
// * Sequelize: Custom Equippables Migration File
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
    /** Forward Migration: Create Table 'CustomEquippables' */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CustomEquippables', {
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
        /** Equippable Type - String Field, Not Nullable */
        equippableType: {
            allowNull: false,
            type: Sequelize.STRING
        },
        /** Equippable ID - Integer Field, Not Nullable */
        equippableId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        /** Equippable Stats - String Field, Not Nullable */
        stats: {
            allowNull: false,
            type: Sequelize.STRING
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

    /** Backward Migration: Drop 'CustomEquippables' Table */
    async down(queryInterface, _Sequelize) {
        options.tableName = 'CustomEquippables';
        await queryInterface.dropTable('CustomEquippables');
    }
};