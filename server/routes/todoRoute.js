const route = require('express').Router()
const ToDoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authenticate)

route.post('/', ToDoController.create)
route.get('/', ToDoController.read)

route.use('/:id', authorization)

route.get('/:id', ToDoController.findOne)
route.put('/:id', ToDoController.update)
route.patch('/:id', ToDoController.finish)
route.delete('/:id', ToDoController.delete)

module.exports = route