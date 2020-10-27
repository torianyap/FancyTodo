const route = require('express').Router()
const ToDoController = require('../controllers/todoController')
const authenticate = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.use(authenticate)

route.post('/', ToDoController.create)
route.get('/', ToDoController.read)

route.get('/:id', authorization ,ToDoController.findOne)
route.put('/:id', authorization ,ToDoController.update)
route.patch('/:id', authorization ,ToDoController.finish)
route.delete('/:id', authorization ,ToDoController.delete)

module.exports = route