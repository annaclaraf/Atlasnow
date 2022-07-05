const knex = require('../database')
const jwt  = require('jsonwebtoken')

const authConfig = require('../config/auth')

module.exports = {
    async login(req, res, next) {
        try {
            const { user } = req.params
            const { email, password } = req.body

            if(user == "admin") {
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
            }

            if(user == "funcionario") {
                const funcionario = await knex('funcionarios').first('*').where({  email })

                if(!funcionario) {
                    return res.status(400).send({ error: "Funcionário não cadastrado"})
                }
    
                if(password != funcionario.CPF) {
                    return res.status(400).send({ error: "Senha inválida"})
                }
    
                const token = jwt.sign({ email: funcionario.email}, authConfig.secret, {
                    expiresIn: authConfig.expiration
                })

                return res.status(201).send({ email, token })
            }

            if(user == "emissor") {
                const funcionario = await knex('funcionarios').first('*').where({  email })
                const emissor = await knex('emissores').first('*').where({  CPF: funcionario.CPF })

                if(!emissor) {
                    return res.status(400).send({ error: "Emissor não cadastrado"})
                }
    
                if(password != emissor.CPF) {
                    return res.status(400).send({ error: "Senha inválida"})
                }

                let e = emissor.CPF 
    
                const token = jwt.sign({ email: emissor.email}, authConfig.secret, {
                    expiresIn: authConfig.expiration
                })

                return res.status(201).send({ email, token, e })
            }
        } catch (error) {
            next(error)
        }
    }
} 