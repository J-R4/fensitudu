const { User,Todo } = require('../models/index.js')

class TodoController {
    static todos(req, res) {
        Todo.findAll()
            .then((data) => {
                res.status(200).json({data})
            })
            .catch((err) => {
                //if(err)
                console.log(err)
                res.status(404).json({message: err || `Not Found`}) // tanya ka arief
            })
    }

    static postTodos(req, res) {
        let { title, description, status, due_date } = req.body
        let obj = { title, description, status, due_date }

        Todo.create(obj)
            .then(() => {
                res.status(201).json({obj})
            })
            .catch((err) => {
                if (err.msg) {
                    const errorMsg = err.msg
                    res.status(400).json({message: errorMsg}) // tanya ka arief
                } else {
                    res.status(500).json({message: err}) // tanya ka arief
                }
            })
    }
}

module.exports = TodoController