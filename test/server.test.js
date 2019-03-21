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
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
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
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
    console.log("Response: "+res.body.body);
    t.end()
    });
});

/** TEST GET INVOICES  WHEN LESS ORDER BY*/
test('GET /api/v1/invoices/list/0/5 -- Order By Null', (t) => {    
    supertest(server)
    .get('/api/v1/invoices/list/0/10')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) =>{
    t.error(err, 'No error in call')
    t.assert(res.body.response ===400, "Reponse 400")
    t.assert(res.body.error !==null, "The orderBy list size is zero.")
    t.end()
    });
});


/** TEST GET INVOICES  ORDER BY MONTH*/
test('GET /api/v1/invoices/list/0/10 -- Order By ReferenceMonth', (t) => {    
    supertest(server)
    .get('/api/v1/invoices/list/0/10')
    .set('x-access-token', token)
    .set('x-access-order-by-month', 'ReferenceMonth')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
    t.assert(res.body.body.length > 0, "Return list from invoices Order By ReferenceMonth")
    
    t.end()
    });
});

/** TEST GET INVOICES  ORDER BY YEAR */
test('GET /api/v1/invoices/list/0/10 -- Order By ReferenceYear', (t) => {    
    supertest(server)
    .get('/api/v1/invoices/list/0/10')
    .set('x-access-token', token)
    .set('x-access-order-by-year', 'ReferenceYear')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
    t.assert(res.body.body.length > 0, "Return list from invoices Order By ReferenceYear")
    t.end()
    });
});

/** TEST GET INVOICES  ORDER BY DOCUMENTS */
test('GET /api/v1/invoices/list/0/10 -- Order By ReferenceDoc', (t) => {    
    supertest(server)
    .get('/api/v1/invoices/list/0/10')
    .set('x-access-token', token)
    .set('x-access-order-by-doc', 'Document')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
    t.assert(res.body.body.length > 0, "Return list from invoices Order By ReferenceDoc")
    t.end()
    });
});

/** TEST DELETE IVOICE WITH SUCCESS */
test('GET /api/v1/invoices/delete/2 -- Delete Invoice', (t) => {    
    supertest(server)
    .delete('/api/v1/invoices/delete/2')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) =>{
    t.error(err, 'No error in call')
    t.assert(res.body.error ===null, "No error in response")
    t.assert(res.body.body.length > 0, "Invoice deleted with success!")
    t.end()
    });
});
