const knex = require('../database')
const jwt  = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, CPF } = req.body

            const funcionario = await knex('funcionarios').first('*').where({  email })

            if(!funcionario) {
                return res.status(400).send({ error: "Funcionário não cadastrado"})
            }

            if(CPF != funcionario.CPF) {
                return res.status(400).send({ error: "Senha inválida"})
            }

            const token = jwt.sign({ email: funcionario.email}, authConfig.secret, {
                expiresIn: authConfig.expiration
            })

            const emailFun = funcionario.email

            return res.status(201).send({ email: emailFun, token })
        } catch (error) {
            next(error)
        }
    }
} 