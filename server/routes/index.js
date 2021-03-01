const router = require('express').Router()

const Controller = require('../controllers/Controller.js')
const UserController = require('../controllers/UserController.js')
const TodoController = require('../controllers/TodoController.js')

router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.get('/todos', TodoController.todos)
router.post('/todos', TodoController.postTodos)

router.get('/todos/:id', TodoController.todosById)

router.put('/todos/:id', TodoController.put)

router.patch('/todos/:id', TodoController.patch)

router.delete('/todos/:id', TodoController.delete)

module.exports = router