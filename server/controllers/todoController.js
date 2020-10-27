const {ToDo} = require('../models/index')

class ToDoController {
    static async create(req, res) {
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                UserId: req.user.id
            }
            const newToDo = await ToDo.create(payload, {
                returning: true
            })
            res.status(201).json(newToDo)
        } catch (error) {
            if (error.errors) {
                res.status(400).json(error.errors[0].message)
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async read(req, res) {
        try {
            const UserId = req.user.id
            const todos = await ToDo.findAll({
                order: [['id', 'asc']],
                where: {
                    UserId: UserId
                }
            })
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async findOne(req, res) {
        try {
            const id = +req.params.id
            const todo = await ToDo.findByPk(id)
            if (todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({message: `todo with id ${id} is not found`})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async update(req, res) {
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
            }
            const updated = await ToDo.update(payload, {
                where: {
                    id: +req.params.id
                }, 
                returning: true
            })
            if (updated[0] !== 1) {
                res.status(404).json({message: `todo with id ${+req.params.id} is not found`})
            } else {
                res.status(200).json(updated[1][0])
            }

        } catch (error) {
            if (error.errors) {
                res.status(400).json(error.errors[0].message)
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async finish(req, res) {
        try {
            const finished = await ToDo.update({status: true}, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
            if (finished[0] !== 1) {
                res.status(404).json({message: `todo with id ${+req.params.id} is not found`})
            } else {
                res.status(200).json(finished[1][0])
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            const destroyed = await ToDo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if (destroyed !== 1) {
                res.status(404).json({message: `id ${+req.params.id} is not found`})
            } else {
                res.status(200).json({msg: `todo deleted successfuly`})
            }
        } catch (error) {
            res.status(500).json(error)
        }

    }
}

module.exports = ToDoController