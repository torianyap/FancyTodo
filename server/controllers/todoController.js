const {ToDo} = require('../models/index')

class ToDoController {
    static async create(req, res, next) {
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
        } catch (err) {
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            const UserId = req.user.id
            const todos = await ToDo.findAll({
                order: [['id', 'asc']],
                where: {
                    UserId: UserId
                }
            })
            res.status(200).json(todos)
        } catch (err) {
            next(err)
        }
    }

    static async findOne(req, res, next) {
        try {
            const id = +req.params.id
            const todo = await ToDo.findByPk(id)
            if (todo) {
                res.status(200).json(todo)
            } else {
                throw { msg: `todo with id ${id} is not found`, status: 404 }
            }
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
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
                throw { msg: `todo with id ${+req.params.id} is not found`, status: 404 }
            } else {
                res.status(200).json(updated[1][0])
            }

        } catch (err) {
            next(err)
        }
    }

    static async finish(req, res, next) {
        try {
            const finished = await ToDo.update({status: true}, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
            if (finished[0] !== 1) {
                throw { msg: `todo with id ${+req.params.id} is not found`, status: 404 }
            } else {
                res.status(200).json(finished[1][0])
            }
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const destroyed = await ToDo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if (destroyed !== 1) {
                throw { msg: `todo with id ${+req.params.id} is not found`, status: 404 }
            } else {
                res.status(200).json({msg: `todo deleted successfuly`})
            }
        } catch (err) {
            next(err)
        }

    }
}

module.exports = ToDoController