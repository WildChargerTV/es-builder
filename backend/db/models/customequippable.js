'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomEquippable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomEquippable.init({
    userId: DataTypes.INTEGER,
    loadoutId: DataTypes.INTEGER,
    equippableType: DataTypes.STRING,
    equippableId: DataTypes.INTEGER,
    data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomEquippable',
  });
  return CustomEquippable;
};