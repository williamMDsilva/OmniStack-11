const req = require('supertest');

const app = require('../../src/app');

const connection = require('../../src/database/connections');

describe('ONBS', () => {
    beforeEach(async () => {
       await connection.migrate.latest();
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('Shoud be able to create a new ong', async () => {
        const res = await req(app).post('/ongs').send({
            name: "ONg name",
            email:"emmail@ongs.com",
            whatsapp:"45900000000",
            city:"Cascavel",
            uf:"PR"	
        })

        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toHaveLength(8);
    })
})