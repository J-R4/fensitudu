'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Title cannot be Empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Description cannot be Empty`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Status cannot be Empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        cannotPastDate(value) {
          let now = new Date()
          if (value < now) {
            throw({msg: `Cannot using past date`}) // tanya ka arief
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};