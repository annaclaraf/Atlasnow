const knex = require('../database')

module.exports = {
  async index(req, res) {
    const setor = await knex('setor')

    return res.json(setor)
  },

  async create(req, res, next) {
    try {
      const { nome } = req.body

      if (!nome) {
        return res
          .status(400)
          .json({ error: 'Preencha os campos obrigatórios' })
      }

      const id = await knex('setor').insert({
        nome
      })

      const setor = await knex('setor').first('*').where({ id })

      return res.status(201).json(setor)
    } catch (error) {
      next(error)
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params

      const setor = await knex('setor').where({ nome: id })

      if (setor.length == 0) {
        return res.status(400).json({ error: 'Nenhum setor encontrado' })
      }

      return res.json(setor)
    } catch (error) {
      console.log(error)
    }
  },

  async update(req, res, next) {
    const { nome } = req.body
    const { id } = req.params

    const setor = await knex('setor').first('*').where({ nome: nome })
    console.log(nome)

    if (setor) {
      return res
        .status(400)
        .json({ error: 'Já existe um setor cadastrado com esse nome!' })
    }

    try {
      await knex('setor')
        .update({
          nome
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

      await knex('setor').where({ id }).del()

      return res.send()
    } catch (error) {
      next(error)
    }
  }
}
