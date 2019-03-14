const test = require('tape');
const supertest = require('supertest');
const server = require('../server');
let token = require('./token.test.js');
console.log("TOKEN IMPORTED: "+token);
/** TEST GET INVOICES */
test('GET /api/v1/invoices/list/0/10 -- Order By ReferenceMonth', (t) => {    
    supertest(server)
    .get('/api/v1/invoices/list/0/10')
    .set('x-access-token', token)
    .set('x-access-order-by-month', 'ReferenceMonth')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'Sem erros na chamada')
    t.assert(res.body.error ===null, "Sem erros na resposta")
    console.log("Response: "+JSON.stringify(res.body.body));
    t.end()
    });
});