const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query

        const incidents = await connection('INCIDENTS')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])

        const [count] = await connection('INCIDENTS').count()

        response.header('X-Total-Count', count['count(*)'])
        return response.json({ incidents })
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [result] = await connection('INCIDENTS').insert({
            title, description, value, ong_id
        })

        return response.json({ id: result })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('INCIDENTS')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permited' })
        }

        await connection('INCIDENTS').where('id', id).delete()

        return response.status(204).send()
    }
}