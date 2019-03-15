let express         = require('express');
let router          = express();
let InvoiceBusiness = require('../controller/invoice/invoice.business'); 
    router.get('/list/:start?/:end?',function(req,res,next){    
        let tokenSession = req.headers['x-access-token'];
        let dataValidInvoice = {
            "start":req.params.start,
            "end": req.params.end,
            "month":req.headers['x-access-order-by-month'],
            "year":req.headers['x-access-order-by-year'],
            "doc": req.headers['x-access-order-by-doc']
        };        
        let invoice = new InvoiceBusiness(tokenSession);
            invoice.setDataFilter(dataValidInvoice);    
            invoice.setOrderCheck();        
            invoice.getInvoiceList(res);
    });
    router.delete('/delete/:id',function(req,res,next){    
        let tokenSession = req.headers['x-access-token'];
        let id = req.params.id;        
        let invoice = new InvoiceBusiness(tokenSession);
            invoice.setIdInvoice(id);
            invoice.getInvoiceDelete(res);
    });
 module.exports=router;