const route = require('express').Router()
const ToDoController = require('../controllers/todoController')

route.post('/', ToDoController.create)
route.get('/', ToDoController.read)
route.get('/:id', ToDoController.findOne)
route.put('/:id', ToDoController.update)
route.patch('/:id', ToDoController.finish)
route.delete('/:id', ToDoController.delete)

module.exports = route