const express = require('express')
const authMiddleware = require('./middlewares/auth')

const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')
const EmissorController = require('./controllers/EmissorController')
const AuthController = require('./controllers/AuthController')
const SetorController = require('./controllers/SetorController')
const AtaController = require('./controllers/AtaController')

routes.post('/:user/login', AuthController.login)

routes.use(authMiddleware);

routes.get('/funcionarios', FuncionarioController.index)
routes.get('/funcionarios/:id', FuncionarioController.show)
routes.get('/funcionarios/nome/:id', FuncionarioController.showByName)
routes.post('/funcionarios', FuncionarioController.create)
routes.put('/funcionarios/:id', FuncionarioController.update)
routes.delete('/funcionarios/:id', FuncionarioController.delete)

routes.get('/emissores', EmissorController.index)
routes.get('/emissores/:id', EmissorController.show)
routes.get('/emissores/nome/:id', EmissorController.showByName)
routes.post('/emissores', EmissorController.create)
routes.put('/emissores/:id', EmissorController.update)
routes.delete('/emissores/:id', EmissorController.delete)

routes.get('/setor', SetorController.index)
routes.get('/setor/:id', SetorController.show)
routes.get('/setor/nome/:id', SetorController.showByName)
routes.post('/setor', SetorController.create)
routes.put('/setor/:id', SetorController.update)
routes.delete('/setor/:id', SetorController.delete)

routes.get('/atas', AtaController.index)
routes.get('/atas/:id', AtaController.show)
routes.get('/atas/palavrasChave/:id', AtaController.showByPalavrasChave)
routes.post('/atas', AtaController.create)
routes.post('/atas/participantes', AtaController.createParticipantes)
routes.get('/atas/participantes/:id', AtaController.showParticipantes)
routes.put('/atas/:id', AtaController.update)
routes.delete('/atas/:id', AtaController.delete)

module.exports = routes 