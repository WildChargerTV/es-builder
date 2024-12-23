'use strict';
// * backend/db/migrations/20241123091029-create-user.js
// * Sequelize: Users Migration File
// ? As a reminder, this is a representation of the data actually inserted into the table.

/** In production, ensure Sequelize refers to the schema in the .env file. */
let options = {};
if(process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

/** 
 * Export the migration.
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
    /** Forward Migration: Create Table 'Users' */
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            /** ID - Integer Field, Primary Key, Auto-Incremented, Not Nullable */
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            /** Username - String Field (Limit 30 Characters), Unique, Not Nullable */
            username: {
                allowNull: false,
                type: Sequelize.STRING(30),
                unique: true
            },
            /** Email - String Field (Limit 48 Characters), Unique, Not Nullable */
            email: {
                allowNull: false,
                type: Sequelize.STRING(48),
                unique: true
            },
            /** Hashed Password - Binary String Field, Not Nullable */
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING.BINARY
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

    /** Backward Migration: Drop 'Users' Table */
    async down(queryInterface, _Sequelize) {
        options.tableName = 'Users';
        return queryInterface.dropTable(options);
    }
};