const {ToDo} = require('../models/index')

class ToDoController {
    static async create(req, res) {
        try {
            const {title, description, due_date} = req.body

            const newToDo = await ToDo.create({title, description, due_date}, {returning: true})
            res.status(200).json(newToDo)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async read(req, res) {
        try {
            const todos = await ToDo.findAll({order: [['id', 'asc']]})
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
                throw new Error(`id ${+req.params.id} is not found`)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            const {title, description, due_date} = req.body

            const updated = await ToDo.update(
                {title, description, due_date},
                {where: {id: id}, returning: true}
            )

            res.status(200).json(updated[1][0])

        } catch (error) {
            res.status(500).json(error)
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
            res.status(200).json(finished[1][0])
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            await ToDo.destroy({
                where: {
                    id: +req.params.id
                }
            })
            res.status(200).json({msg: `todo deleted successfuly`})
        } catch (error) {
            res.status(500).json(error)
        }

    }
}

module.exports = ToDoController