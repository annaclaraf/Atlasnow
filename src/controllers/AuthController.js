const knex = require('../database')
const jwt  = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const admin = await knex('admin').first('*').where({  email })

            if(!admin) {
                return res.status(400).send({ error: "Administrador inválido"})
            }

            if(password != admin.password) {
                return res.status(400).send({ error: "Senha inválida"})
            }

            const token = jwt.sign({ email: admin.email}, authConfig.secret, {
                expiresIn: authConfig.expiration
            })

            return res.status(201).send({ email, token })
        } catch (error) {
            next(error)
        }
    }
} 