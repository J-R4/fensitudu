const { User, Todo } = require('../models/index.js');

class TodoController {
    static todos = async (req, res, next) => {
        try {
            let todo = await Todo.findAll({
                where: {
                    UserId: req.currentUser.id,
                },
            });
            if (!todo) {
                throw {
                    status: 404,
                    message: `Not Found`,
                };
            }
            res.status(200).json({ todo });
        } catch (err) {
            next(err);
        }
    };

    static postTodos = async (req, res, next) => {
        try {
            let data = req.body;
            let dateFormat = new Date(data.due_date).toLocaleString();
            let obj = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: dateFormat,
                UserId: req.currentUser.id,
            };
            let theData = await Todo.create(obj);

            if (!theData) {
                throw {
                    status: 400,
                    message: `Bad Request`,
                };
            }

            res.status(201).json({ theData });
        } catch (err) {
            next(err);
        }
    };

    static todosById = async (req, res, next) => {
        try {
            let target = +req.params.id;
            let theTodo = await Todo.findByPk(target);

            if (!theTodo) {
                throw {
                    status: 404,
                    message: `cannot find the id / todo`,
                };
            }
            res.status(200).json({ theTodo });
        } catch (err) {
            next(err);
        }
    };

    static put = async (req, res, next) => {
        try {
            let target = +req.params.id;
            let data = req.body;
            let obj = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date,
            };

            let todo = await Todo.findByPk(target);

            if (!todo) {
                throw {
                    status: 404,
                    message: `data not found`,
                };
            }

            let update = await Todo.update(obj, {
                where: { id: target },
                returning: true, // isi update data setelah di update
            });

            if (!update[0]) {
                throw {
                    status: 400,
                    message: `Error in validation`,
                };
            }
            res.status(200).json({ update });
        } catch (err) {
            next(err);
        }
    };

    static patch = async (req, res, next) => {
        try {
            let target = +req.params.id;
            let data = { status: req.body.status };
            let todo = await Todo.findByPk(target);

            if (!todo) {
                throw {
                    status: 404,
                    message: `data not found`,
                };
            }

            let update = await Todo.update(data, {
                where: {
                    id: target,
                },
                returning: true, // isi update data setelah di update
            });

            if (!update[0]) {
                throw {
                    status: 400,
                    message: `Error in validation`,
                };
            }

            res.status(200).json({ update });
        } catch (err) {
            next(err);
        }
    };

    static delete = async (req, res, next) => {
        try {
            let target = +req.params.id;

            let todo = await Todo.findByPk(target);

            if (!todo) {
                throw {
                    status: 404,
                    message: `data not found`,
                };
            }

            let begone = await Todo.destroy({
                where: {
                    id: target,
                },
            });
            res.status(200).json({ begone, message: `Todos with id ${target} has been deleted` });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = TodoController;
