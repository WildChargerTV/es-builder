'use strict';
// * backend/db/models/user.js
// * Sequelize: User Model File
// ? As a reminder, this is Sequelize's abstraction of a database table.

// Node Module Imports
const { Model } = require('sequelize');

/** Export the model. */
module.exports = (sequelize, DataTypes) => {
    // Declare the User model class.
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Loadout, {
                foreignKey: 'userId',
                sourceKey: 'id',
                onDelete: 'CASCADE',
                hooks: true
            });
        }
    }

    // Initialize the model with the below fields & options.
    User.init({
        /** 
         * Username - String Field, Unique, Not Nullable
         * Length Restriction: Minimum 4, Maximum 30
         * Custom Restriction: Must NOT be an Email Address
         */
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [4, 30],
                isNotEmail(val) {
                    if(sequelize.Validator.isEmail(val)) 
                        throw new Error("Cannot be an email.");
                }
            }
        },
        /**
         * Email - Email Field, Unique, Not Nullable
         * Length Restriction: Minimum 5, Maximum 48
         */
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
                len: [5, 48]
            }
        },
        /**
         * Hashed Password - Binary String Field, Not Nullable
         * Length Restriction: Minimum 60, Maximum 60
         */
        hashedPassword: {
            allowNull: false,
            type: DataTypes.STRING.BINARY,
            validate: {
                len: [60, 60]
            }
        }
    }, {
        /** Sequelize - Required Sequelize Connection */
        sequelize,
        /** Model Name - Name of the model. Must be same as the class name. */
        modelName: 'User',
        /** Default Scope - Influences the returned data when querying this table. */
        defaultScope: { 
            attributes: {
                // Exclude the following fields from being returned in queries.
                exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
            }
        }
  });

  // Return the initialized User model.
  return User;
};