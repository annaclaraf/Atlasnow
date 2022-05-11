const express = require('express')

const routes = express.Router()

const FuncionarioController = require('./controllers/FuncionarioController')

routes.get('/funcionarios', FuncionarioController.index)
routes.post('/funcionarios', FuncionarioController.create)
routes.put('/funcionarios/:id', FuncionarioController.update)
routes.delete('/funcionarios/:id', FuncionarioController.delete)

module.exports = routes 