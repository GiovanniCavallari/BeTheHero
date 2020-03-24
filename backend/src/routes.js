/**
 * Rota / Recursos
 * 
 * Métodos HTTP:
 * 
 * GET: buscar uma informação do back-end
 * POST: criar uma informação no back-end
 * PUT: alterar uma informação no back-end
 * DELETE: deletar uma informação no back-end
 * 
 * Tipos de parâmetro:
 * 
 * Query params: params nomeados e enviados na rota após o símbolo ? (filtros, paginação)
 * Route params: params utilzados para identificar recursos
 * Request body: corpo da requisição, utilizado para criar ou alterar recursos
 * 
 * Banco de Dados:
 * 
 * SQL: MySql, SQLite, PostgresSQL, Oracle, SQL Server
 * NoSQL: MongoDB, CouchDb
 * 
 * Driver: SELECT * FROM TABLE;
 * Query builder: table('users').select('*').where 
 */

const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes