const knex = require('../database')

module.exports = {
    async index(req, res) {
        const emissores = await
            knex('emissores')
            .join('funcionarios', 'funcionarios.CPF', '=', 'emissores.CPF')
            .select('emissores.*', 'funcionarios.nome')

        return res.json(emissores)
    },

    async create(req, res, next) {
        try {
            const { CPF, dataAdmissao, dataFimAdmissao } = req.body

            const funcionario = await knex('funcionarios').first('*').where({  CPF })

            if(!funcionario) {
                return res.status(400).json({ error: 'Nenhum funcionário cadastrado com esse CPF'});
            }

            const id = await knex('emissores').insert({
                CPF,
                dataAdmissao,
                dataFimAdmissao
            })

            const emissor = await knex('emissores').first('*').where({ id })

            return res.status(201).json(emissor)

        } catch (error) {
            next(error)
        }
    },

    async show(req, res, next) {
        try {
            const { id } = req.params

            const emissor = await
                knex('emissores')
                .join('funcionarios', 'funcionarios.CPF', '=', 'emissores.CPF')
                .select('emissores.*', 'funcionarios.nome')
                .where({ id })

            return res.json(emissor)
        } catch (error) {
            console.log(error)
        }
    },

    async update(req, res, next) {
        const { CPF, dataAdmissao, dataFimAdmissao } = req.body
        const { id } = req.params

        try {
            await knex('emissores').update({
                CPF, 
                dataAdmissao,
                dataFimAdmissao
            }).where({ id })

            return res.send()

        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('emissores').where({ id }).del()

            return res.send()

        } catch (error) {
            next(error)
        }
    }
} 