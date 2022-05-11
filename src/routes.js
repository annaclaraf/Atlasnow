const express = require('express')

const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')
const AuthController = require('./controllers/AuthController')

routes.get('/funcionarios', FuncionarioController.index)
routes.post('/funcionarios', FuncionarioController.create)
routes.put('/funcionarios/:id', FuncionarioController.update)
routes.delete('/funcionarios/:id', FuncionarioController.delete)

routes.post('/login', AuthController.login)

module.exports = routes 