const { User,Todo } = require('../models/index.js')

class TodoController {

    static todos = async (req, res, next) => {
        try {
            let todo = await Todo.findAll()

            res.status(200).json({todo})
        } catch (err) {
            res.status(404).json({message:err || `Not Found`})
        }
    }

    static postTodos = async (req, res, next) => {
        try {
            let data = req.body
            let dateFormat = new Date(data.due_date).toLocaleString()
            let obj = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: dateFormat
            }
            let theData = Todo.create(obj)

            res.status(201).json({obj})
        } catch (err) {
            if (err.msg) {
                    const errorMsg = err.msg
                    res.status(400).json({message: errorMsg}) 
                } else {
                    res.status(500).json({message: err}) 
                }
        }
    }

    static todosById = async (req, res, next) => {
        try {
            let target = +req.params.id
            let theTodo = await Todo.findByPk(target)

            res.status(200).json({theTodo})
        } catch (err) {
            res.status(404).json({message: err})
        }
    }

    static put = async (req, res, next) => {
        try {
            let target = +req.params.id
            let data = req.body
            let obj = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            }
            let update = await Todo.update(obj, {
                where: { id: target },
                returning: true // isi update data setelah di update
            })
            res.status(200).json({update})
        } catch (err) {
            // res.status(400).json({ message: `error in validation, kirim validation error` })
            res.status(500).json({message: `error in server`})
        }
    }

    static patch = async (req, res, next) => {
        try {
            let target = +req.params.id
            let data = {status: req.body.status}
            let update = await Todo.update(data, {
                where: {
                    id: target
                },
                returning: true // isi update data setelah di update
            })
            res.status(200).json({update})
        } catch (err) {
            console.log(err)
            // res.status(400).json({ message: `error in validation, kirim validation error` })
            // res.status(404).json({ message: `data not found`})
            res.status(500).json({message: `error in server`})
        }
    }

    static delete = async (req, res, next) => {
        try {
            let target = +req.params.id
            let begone = await Todo.destroy({
                where: {
                    id: target
                }
            })
            res.status(200).json({begone, message: `Todos with id ${target} has been deleted`})
        } catch (err) {
            // res.status(404).json({ message: `error not found` })
            res.status(500).json({ message: `error in server` })
        }
    }
}

module.exports = TodoController