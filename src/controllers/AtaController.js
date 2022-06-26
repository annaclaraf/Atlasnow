const knex = require('../database')

module.exports = {
    async index(req, res) {
        const atas = await knex('atas')

        return res.json(atas)
    },

    async create(req, res, next) {
        try {
            const {
                tituloReuniao,
                dataInicio,
                dataFim,
                pauta,
                setor,
                descricao,
                palavrasChave,
                ata
            } = req.body

            if (
                !tituloReuniao ||
                !dataInicio ||
                !dataFim ||
                !pauta ||
                !setor ||
                !descricao ||
                !palavrasChave ||
                !ata
            ) {
                return res.status(400).json({ error: 'Preencha todos os campos' })
            }

            await knex('atas').insert({
                tituloReuniao,
                dataInicio,
                dataFim,
                pauta,
                setor,
                descricao,
                palavrasChave,
                ata
            })

            return res
                .status(201)
                .send()
        } catch (error) {
            next(error)
        }
    },

    async show(req, res, next) {
        try {
            const { id } = req.params

            const ata = await knex('atas').where({ id })

            if (!ata) {
                return res.status(400).json({ error: 'Nenhuma ata encontrada' })
            }

            return res.json(ata)
        } catch (error) {
            next(error)
        }
    },

    async showByPalavrasChave(req, res, next) {
        try {
            const { id } = req.params

            const ata = await knex('atas').where('palavrasChave', 'like', `%${id}%`)

            if (ata.length == 0) {
                return res.status(400).json({ error: 'Nenhuma ata encontrada' })
            }

            return res.json(ata)
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const {
            tituloReuniao,
            dataInicio,
            dataFim,
            pauta,
            setor,
            descricao,
            palavrasChave,
            ata
        } = req.body
        const { id } = req.params

        try {
            await knex('atas')
                .update({
                    tituloReuniao,
                    dataInicio,
                    dataFim,
                    pauta,
                    setor,
                    descricao,
                    palavrasChave,
                    ata
                })
                .where({ id })

            return res.send()
        } catch (error) {

            next(error)

        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await knex('atas').where({ id }).del()

            return res.send()
        } catch (error) {
            next(error)
        }
    }
}
