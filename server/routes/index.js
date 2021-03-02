const router = require('express').Router()

const Controller = require('../controllers/Controller.js')
const UserController = require('../controllers/UserController.js')
const TodoController = require('../controllers/TodoController.js')

const { authenticate, authorize } = require('../middlewares/auth.js')

const axios = require('axios')

const getYesNo = async (req, res, next) => {
    try {
    let theRes = await axios({
        method: 'get',
        url: 'https://yesno.wtf/api'
    })
        if (theRes) {
            res.status(200).json(theRes.data)
        } else {
            throw ({
                status: 404,
                message: `not found in the yesno`
            })
        }
    } catch (err) {
        next(err)
    }
}

router.get('/', getYesNo, (req, res) => {
})

router.post('/login', UserController.login)

router.post('/register', UserController.register)

router.use(authenticate)

router.get('/todos', TodoController.todos)
router.post('/todos', TodoController.postTodos)

router.use(authorize)

router.get('/todos/:id', TodoController.todosById)

router.put('/todos/:id', TodoController.put)

router.patch('/todos/:id', TodoController.patch)

router.delete('/todos/:id', TodoController.delete)

module.exports = router