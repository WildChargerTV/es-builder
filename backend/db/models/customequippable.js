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
            /** Many-to-One: Many Custom Equippables can belong to one User */
            CustomEquippable.belongsTo(models.User, {
                foreignKey: 'userId'
            });
        }
    }

    // Initialize the model with the below fields & options.
    CustomEquippable.init({
        /** User ID - Integer Field, Not Nullable */
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        /**
         * Equippable Type - String Field, Not Nullable
         * Value Restriction: Value must be 'Primary' or 'Devices'
         */
        equippableType: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['Primary', 'Devices']],
                    msg: 'Custom equippable must be a Primary Weapon or Device'
                }
            }
        },
        /** Equippable ID - Integer Field, Not Nullable */
        equippableId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        /** Stats - String Field, Not Nullable */
        stats: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }, {
        /** Sequelize - Required Sequelize Connection */
        sequelize,
        /** Model Name - Name of the model. Must be the same as the class name. */
        modelName: 'CustomEquippable',
    });

    // Return the initialized Custom Equippable model.
    return CustomEquippable;
};