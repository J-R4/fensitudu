'use strict';

const { hashPassword } = require('../helpers/bcrypt.js')

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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email cannot be empty`
        },
        isEmail: {
          msg: `The input must be in email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  }),
    User.addHook('beforeCreate', (user, opt) => {
    user.password = hashPassword(user.password)
  })
  return User;
};