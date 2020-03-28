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
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

// validar body
routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index)

// validar body e header
routes.post('/incidents', IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes