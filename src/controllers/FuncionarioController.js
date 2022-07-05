const knex = require('../database')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
  async index(req, res) {
    const funcionarios = await knex('funcionarios')
      .join('endereços', 'endereços.funcionarioCPF', '=', 'funcionarios.CPF')
      .select('funcionarios.*', 'rua', 'numero', 'CEP', 'cidade', 'estado')

    return res.json(funcionarios)
  },

  async create(req, res, next) {
    try {
      const {
        CPF,
        nome,
        email,
        telefone,
        setor,
        rua,
        numero,
        CEP,
        cidade,
        estado
      } = req.body
     
      if (
        !CPF ||
        !nome ||
        !email ||
        !telefone ||
        !setor ||
        !rua ||
        !numero ||
        !CEP ||
        !cidade ||
        !estado
      ) {
        return res.status(400).json({ error: 'Preencha todos os campos' })
      }

      const funcionario1 = await knex('funcionarios').first('*').where({ CPF })
      const funcionario2 = await knex('funcionarios')
        .first('*')
        .where({ email })

      if (funcionario1) {
        return res
          .status(400)
          .json({ error: 'Funcionario com esse CPF já cadastrado' })
      }

      if (funcionario2) {
        return res
          .status(400)
          .json({ error: 'Funcionario com esse email já cadastrado' })
      }

      const trx = await knex.transaction()
      
      await knex('funcionarios').insert({
        CPF,
        nome,
        email,
        telefone,
        setor
      })
      

      await trx('endereços').insert({
        funcionarioCPF: CPF,
        rua,
        numero,
        CEP,
        cidade,
        estado
      })

      await trx.commit()

      const funcionario = await knex('funcionarios').first('*').where({ email })

      const token = jwt.sign({ email: funcionario.email }, authConfig.secret, {
        expiresIn: authConfig.expiration
      })

      const endereço = await knex('endereços')
        .where({ funcionarioCPF: CPF })
        .join(
          'funcionarios',
          'funcionarios.CPF',
          '=',
          'endereços.funcionarioCPF'
        )
        .select('rua', 'numero', 'CEP', 'cidade', 'estado')

      return res
        .status(201)
        .send({ nome, email, telefone, setor, token, endereço })
    } catch (error) {
      await trx.rollback()
      next(error)
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params

      const funcionario = await knex('funcionarios')
        .join('endereços', 'endereços.funcionarioCPF', '=', 'funcionarios.CPF')
        .select('funcionarios.*', 'rua', 'numero', 'CEP', 'cidade', 'estado')
        .where({ CPF: id })

      if (funcionario.length == 0) {
        return res.status(400).json({ error: 'Nenhum funcionario encontrado' })
      }

      return res.json(funcionario)
    } catch (error) {
      console.log(error)
    }
  },

  async showByName(req, res, next) {
    try {
      const { id } = req.params
      const funcionario = await knex('funcionarios').where('nome', 'like', `%${id}%`)

      if (funcionario.length == 0) {
        return res.status(400).json({ error: 'Nenhum funcionario encontrado' })
      }

      return res.json(funcionario)
    } catch (error) {
      console.log(error)
    }
  },

  async update(req, res, next) {
    const { nome, email, telefone, setor, rua, numero, CEP, cidade, estado } =
      req.body
    const { id } = req.params

    if (email) {
      const funcionario = await knex('funcionarios').first('*').where({ email })
      const funcionario1 = await knex('funcionarios')
        .first('*')
        .where({ CPF: id })

      if (funcionario && email != funcionario1.email) {
        return res.status(400).json({ error: 'Email já cadastrado' })
      }
    }

    try {
      await knex('funcionarios')
        .update({
          nome,
          email,
          telefone,
          setor
        })
        .where({ CPF: id })

      return res.send()
    } catch (error) {
      try {
        const trx = await knex.transaction()

        await trx('endereços')
          .update({
            rua,
            numero,
            CEP,
            cidade,
            estado,
            funcionarioCPF: id
          })
          .where({ funcionarioCPF: id })

        await trx.commit()

        return res.send()
      } catch (error) {
        await trx.rollback()
        next(error)
      }
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params

      await knex('funcionarios').where({ CPF: id }).del()

      return res.send()
    } catch (error) {
      next(error)
    }
  }
}
