const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate unique id', function() {
    it('Should generate an unique id', () => {
        const id = generateUniqueId()
        expect(id).toHaveLength(8)
    })
})