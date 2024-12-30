'use strict';
// * backend/db/models/customequippable.js
// * Sequelize: Custom Equippable Model File
// ? As a reminder, this is Sequelize's abstraction of a database table.

// Node Module Imports
const { Model } = require('sequelize');

/** Export the model. */
module.exports = (sequelize, DataTypes) => {
    // Declare the Custom Equippable model class.
    class CustomEquippable extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CustomEquippable.belongsTo(models.User, {
                foreignKey: 'userId'
            });
        }
    }
    CustomEquippable.init({
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        equippableType: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isIn: ['Primary', 'Devices']
            }
        },
        equippableId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        stats: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'CustomEquippable',
    });
    return CustomEquippable;
};