const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
    async index(equest, response) {
        const ongs = await connection('ONGS').select('*')
        return response.json({ ongs })
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
        const id = generateUniqueId()

        await connection('ONGS').insert({
            id, name, email, whatsapp, city, uf
        })

        return response.json({ id })
    }
}