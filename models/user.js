'use strict';
const {
  Model
} = require('sequelize');
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
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_image: DataTypes.TEXT('long'), 
    total_orders: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    last_logged_in: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};