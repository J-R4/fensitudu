const router = require('express').Router()

const Controller = require('../controllers/Controller.js')
const UserController = require('../controllers/UserController.js')
const TodoController = require('../controllers/TodoController.js')

router.get('/', (req, res) => {
    res.send('hello world')
})

router.get('/todos', TodoController.todos)
router.post('/todos', TodoController.postTodos)

module.exports = router