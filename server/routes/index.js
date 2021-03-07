const router = require('express').Router();

const ApiController = require('../controllers/ApiController.js');
const UserController = require('../controllers/UserController.js');
const TodoController = require('../controllers/TodoController.js');

const { authenticate, authorize } = require('../middlewares/auth.js');

//Api Controller
router.get('/', ApiController.getYesNo);

router.get('/weather', ApiController.getWeather);
router.get('/quotes', ApiController.quotes);

//User Controller
router.post('/login', UserController.login);
router.post('/oAuth', UserController.loginGoogle);

router.post('/register', UserController.register);

router.use(authenticate);

//TDController

router.get('/todos', TodoController.todos);
router.post('/todos', TodoController.postTodos);

router.use(authorize);

router.get('/todos/:id', TodoController.todosById);

router.put('/todos/:id', TodoController.put);

router.patch('/todos/:id', TodoController.patch);

router.delete('/todos/:id', TodoController.delete);

module.exports = router;
