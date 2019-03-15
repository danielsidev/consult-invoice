const test = require('tape');
const InvoiceBusiness = require('../controller/invoice/invoice.business');


test('Testing Invoice Business Construct', (t) => {
    t.plan(13);
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAyMjo1MDoxOSIsImlhdCI6MTU1MjYxNDYxOSwiZXhwIjoxNTUyNjE4MjE5fQ.1WeI6nuXBb7isGCP0aeb6hHunr4mPzrd6YaJAMda0is";
    let list = [];
    let invoice = new InvoiceBusiness(token);
    t.assert(invoice.id===0, "Set id Ok!");
    t.assert(invoice.month===null, "Construct month Ok!");
    t.assert(invoice.year===null, "Construct year Ok!");
    t.assert(invoice.doc===null, "Construct doc Ok!");
    t.assert(invoice.start===0, "Construct start Ok!");
    t.assert(invoice.end===10, "Construct end Ok!");
    t.assert(invoice.order_by.length===list.length, "Construct order_by Ok!");
    t.assert(invoice.order_check .length===list.length, "Construct order_by Ok!");
    t.assert(invoice.data===null, "Construct data Ok!");
    t.assert(invoice.token===token, "Construct token Ok!");
    t.assert(invoice.is_active===0, "Construct is_active Ok!");
    t.assert(invoice.desactive_at.length===19, "Construct desactive_at Ok!");
    t.assert(typeof invoice.tokenControl==='object', "Construct tokenControl Ok!");
    
    t.end();
    })

test('Testing Set and Get IdInvoice', (t) => {
    t.plan(2);
    let id = 1;
    let invoice = new InvoiceBusiness("token");
    invoice.setIdInvoice(id);
    t.assert(invoice.id===id, "Set IdInvoice Ok!")
    t.assert(invoice.getIdInvoice()===id, "Get IdInvoice Ok!");
    t.end();
    })

test('Testing Set and Get DataFilter', (t) => {
    t.plan(1);
    let dataValidInvoice = {
    "start":5,
    "end": 9,
    "month":"ReferenceMonth",
    "year":"ReferenceYear",
    "doc": "Document"
        };    
        let invoice = new InvoiceBusiness("token");
        invoice.setDataFilter(dataValidInvoice);
        t.assert(invoice.getDataFilter().start===5 && invoice.getDataFilter().end===9 && invoice.getDataFilter().month==="ReferenceMonth" && invoice.getDataFilter().year==="ReferenceYear" && invoice.getDataFilter().doc==="Document" , "Set and Get Data Filter Ok!")
        t.end()
        })
    
test('Testing Set and Get Order By', (t) => {
            t.plan(1);
            
            let invoice = new InvoiceBusiness("token");
            invoice.setOrderBy("ReferenceMonth");
            invoice.setOrderBy("ReferenceYear");
            invoice.setOrderBy("Document");
            t.assert(invoice.getOrderBy().length===3 && invoice.getOrderBy()[0]==="ReferenceMonth" && invoice.getOrderBy()[1]==="ReferenceYear" && invoice.getOrderBy()[2]==="Document", "Set and Get Data Filter Ok!")
            t.end()
            })
        
test('Testing Set and Get Order Check', (t) => {
    t.plan(1);
    let dataValidInvoice = {
        "start":5,
        "end": 9,
        "month":"ReferenceMonth",
        "year":"ReferenceYear",
        "doc": "Document"
            };    
    let invoice = new InvoiceBusiness("token");
        invoice.setDataFilter(dataValidInvoice);
        invoice.setOrderCheck();
    t.assert(invoice.getOrderCheck().length===3 && invoice.getOrderCheck()[0]==="ReferenceMonth" && invoice.getOrderCheck()[1]==="ReferenceYear" && invoice.getOrderCheck()[2]==="Document", "Set and Get Order Check OK!");
    t.end();
    })
            
    test('Testing Get Invoice Del', (t) => {
        
        t.plan(1);
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiMjAxOS0wMy0xNCAyMjo1MDoxOSIsImlhdCI6MTU1MjYxNDYxOSwiZXhwIjoxNTUyNjE4MjE5fQ.1WeI6nuXBb7isGCP0aeb6hHunr4mPzrd6YaJAMda0is";
        let id = 1;
        let invoice = new InvoiceBusiness(token);
            invoice.setIdInvoice(id);
        t.assert(invoice.getInvoiceDel().is_active===0 && invoice.getInvoiceDel().id_invoice===1 && invoice.getInvoiceDel().desactive_at.length===19, "Get Invoice Del OK!");
        t.end();
        })    