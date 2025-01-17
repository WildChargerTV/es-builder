'use strict';
// * backend/db/models/loadout.js
// * Sequelize: Loadout Model File
// ? As a reminder, this is Sequelize's abstraction of a database table.

// Node Module Imports
const { Model } = require('sequelize');

/** Export the model. */
module.exports = (sequelize, DataTypes) => {
    // Declare the Loadout model class.
    class Loadout extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            /** Many-to-One: Many Loadouts can belong to one User */
            Loadout.belongsTo(models.User, {
                foreignKey: 'userId'
            });
            /**
             * One-to-Many: One Loadout have have many Custom Equippables
             * ! This is deprecated and awaiting removal via migration.
             */
            Loaadout.hasMany(models.CustomEquippable, {
                foreignKey: 'equippableId',
                constraints: false
            });
        }
    }

    // Initialize the model with the below fields & options.
    Loadout.init({
        /** User ID - Integer Field, Not Nullable */
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        /** Flags - String Field, Not Nullable */
        flags: {
            allowNull: false,
            type: DataTypes.STRING
        },
        /**
         * Name - String Field, Not Nullable
         * Length Restriction: Minimum 4, Maximum 30
         */
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: [4, 30]
            }
        },
        /** Ship ID - Integer Field, Not Nullable */
        shipId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        /** Enhancements - String Field, Not Nullable */
        enhancements: {
            allowNull: false,
            type: DataTypes.STRING
        },
        /** Primary Weapons - String Field, Not Nullable */
        primaryWeapons: { 
            allowNull: false,
            type: DataTypes.STRING
        },
        /** Secondary Weapons - String Field, Not Nullable */
        secondaryWeapons: {
            allowNull: false,
            type: DataTypes.STRING
        },
        /** Devices - String Field, Not Nullable */
        devices: {
            allowNull: false,
            type: DataTypes.STRING
        },
        /** Consumables - String Field, Not Nullable */
        consumables: { 
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        /** Sequelize - Required Sequelize Connection */
        sequelize,
        /** Model Name - Name of the model. Must be same as the class name. */
        modelName: 'Loadout',
    });

    // Return the initialized Loadout model.
    return Loadout;
};