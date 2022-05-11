const knex = require('../database')

module.exports = {
    async index(req, res) {
        const funcionarios = await knex('funcionarios')

        return res.json(funcionarios)
    },

    async create(req, res, next) {
        try {
            const { CPF, nome, email, telefone, setor } = req.body

            await knex('funcionarios').insert({
                CPF, nome, email, telefone, setor
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        try {
            const { CPF, nome, email, telefone, setor } = req.body
            const { id } = req.params 

            await knex('funcionarios').update({
                CPF,
                nome, 
                email,
                telefone,
                setor
            }).where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params 

            await knex('funcionarios').where({ id }).del()

            return res.send()

        } catch (error) {
            next(error)
        }
    }
} 