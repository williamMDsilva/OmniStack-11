const { generateId } = require('../../src/utils')
describe("Generate id", () => {
    it('shoud generate id with length 8', () => {
        const id = generateId();
        expect(id).toHaveLength(8)
    })
})