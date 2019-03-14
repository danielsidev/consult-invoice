const test = require('tape');
const supertest = require('supertest');
const server = require('../server');
let token = null;
/** TEST CREATE TOKEN */
test('POST token/create', (t) => {
    let data = {"login":"stoneTest","password":"$T0n&n3t&s5"};
    supertest(server)
    .post('/api/v1/token/create')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'Sem erros na chamada')
    t.assert(res.body.error ===null, "Sem erros na resposta")
    t.assert(res.body.body ==="Token Created!", "New Token created with success!")
    token = res.body.token;
    console.log("Token recuperado: "+token);
    t.end()
    });
});

/** TEST VALID TOKEN */
test('GET /api/v1/token/valid', (t) => {    
    supertest(server)
    .get('/api/v1/token/valid')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'Sem erros na chamada')
    t.assert(res.body.error ===null, "Sem erros na resposta")
    console.log("Response: "+res.body.body);
    t.end()
    });
});

module.exports = token;