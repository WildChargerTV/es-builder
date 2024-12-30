'use strict';
// * backend/db/migrations/20241208054927-create-custom-equippable.js
// * Sequelize: Custom Equippables Migration File
// ? As a reminder, this is a representation of the data actually inserted into the table.

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
        equippableType: {
            allowNull: false,
            type: Sequelize.STRING
        },
        equippableId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        stats: {
            allowNull: false,
            type: Sequelize.STRING
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

    /** Backward Migration: Drop 'CustomEquippables' Table */
    async down(queryInterface, _Sequelize) {
        options.tableName = 'CustomEquippables';
        await queryInterface.dropTable('CustomEquippables');
    }
};