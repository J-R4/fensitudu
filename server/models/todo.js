'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Todo.belongsTo(models.User);
        }
    }
    Todo.init(
        {
            title: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        message: `Title cannot be Empty`,
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        message: `Description cannot be Empty`,
                    },
                },
            },
            status: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        message: `Status cannot be Empty`,
                    },
                    isIn: {
                        args: [[`Unfinished`, `Work in Progress`, `Finished`]],
                        message: `Value must be between unfinished / work in progress / finished`,
                    },
                },
            },
            due_date: {
                type: DataTypes.DATE,
                validate: {
                    cannotPastDate(value) {
                        let now = new Date();
                        if (value < now) {
                            throw { message: `Cannot using past date` };
                        }
                    },
                },
            },
            UserId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Todo',
        }
    );
    return Todo;
};
