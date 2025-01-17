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
            Loadout.belongsTo(models.User, {
                foreignKey: 'userId'
            });
        }
    }
    Loadout.init({
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
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
        shipId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        enhancements: {
            allowNull: false,
            type: DataTypes.STRING
        },
        primaryWeapons: { 
            allowNull: false,
            type: DataTypes.STRING
        },
        secondaryWeapons: {
            allowNull: false,
            type: DataTypes.STRING
        },
        devices: {
            allowNull: false,
            type: DataTypes.STRING
        },
        consumables: { 
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Loadout',
    });
    return Loadout;
};