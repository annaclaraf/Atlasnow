const express = require('express')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')
const EmissorController = require('./controllers/EmissorController')
const AuthController = require('./controllers/AuthController')

routes.post('/login', AuthController.login)

routes.use(authMiddleware);

routes.get('/funcionarios', FuncionarioController.index)
routes.get('/funcionarios/:id', FuncionarioController.show)
routes.post('/funcionarios', FuncionarioController.create)
routes.put('/funcionarios/:id', FuncionarioController.update)
routes.delete('/funcionarios/:id', FuncionarioController.delete)

routes.get('/emissores', EmissorController.index)
routes.get('/emissores/:id', EmissorController.show)
routes.post('/emissores', EmissorController.create)
routes.put('/emissores/:id', EmissorController.update)
routes.delete('/emissores/:id', EmissorController.delete)

module.exports = routes 