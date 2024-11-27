// Sequelize: Users Model File
'use strict';

// Node Module Imports
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({

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
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
            len: [3, 24]
        }
    },
    hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
        validate: {
            len: [60, 60]
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 128]
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 128]
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
        attributes: {
            exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
    }
  });

  return User;
};