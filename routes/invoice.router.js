let errorlog       = require('../util/logger').errorlog;
let successlog     = require('../util/logger').successlog;
let express        = require('express');
let router         = express();
const moment = require("moment");
let InvoiceController = require('../controller/invoice/invoice.controller'); 
let TokenController = require('../controller/token/token.controller');

router.get('/list/:start?/:end?',function(req,res,next){
    let start   = (req.params.start!==undefined)?req.params.start:0;
    let end     = (req.params.end!==undefined)?req.params.end:10;
    let month = (req.headers['x-access-order-by-month']!=="undefined")?req.headers['x-access-order-by-month']:null;
    let year = (req.headers['x-access-order-by-year']!=="undefined")?req.headers['x-access-order-by-year']:null;
    let doc = (req.headers['x-access-order-by-doc']!=="undefined")?req.headers['x-access-order-by-doc']:null;
    let orderCheck = [ month, year, doc];
    let orderBy  = [];
    let data = null;
    let token = req.headers['x-access-token'];
    let Token = new TokenController();     
    Token.checkTokenValid(token,(resposta, msg) =>{
        let data = {"success":resposta, "erro":null, "message":msg};
        if(resposta){
            orderCheck.map(order => {
                if(order!=null){
                    orderBy.push(order);
                }
            });
            if(typeof orderBy === 'object'){
                let tamOrder = orderBy.length;        
                if(tamOrder > 0){        
                    let InvoiceOrder = new InvoiceController();    
                    InvoiceOrder.getInvoiceControl(start, end, orderBy)
                    .then((response) =>{
                        if(response && response.length >0){
                            data = { "orderBy":orderBy};
                            successlog("Router: api/v1/invoices/list/ ","We Found Invoices order by: "+data);
                            res.status(200).json({"response":200, "error":null, "body":response});
                        }else{
                            successlog("Router: api/v1/invoices/list/ ","We Not Found Invoices order by: "+data);
                            res.status(202).json({"response":202, "message":"We Not Found Invoices order by "+data["orderBy"],"error":null, "body":response});
                        }
                    })
                    .catch((error) => {
                        if(error!=={}){
                        errorlog("Router: api/v1/invoices/list/ ",error);
                        res.status(400).json({"response":400, "error":"Is not possible to find invoices now. Try again later.", "body":null});
                        }else{
                            data = { "orderBy":orderBy};
                            successlog("Router: api/v1/invoices/list/ ","We Not Found Invoices order by: "+data);
                            res.status(202).json({"response":202, "message":"We Not Found Invoices order by "+data["orderBy"],"error":null, "body":response});
                        }
                    });
                }else{
                errorlog("Router: api/v1/invoices/list/ ","The orderBy list size is zero");
                res.status(400).json({"response":400, "error":"The orderBy list size is zero.", "body":null});
                }    
            }else{
            errorlog("Router: api/v1/invoices/list/ ","Order By is not a list of strings");
            res.status(400).json({"response":400, "error":"Order By is not a list of strings", "body":null});
            }
        }else{
            data.erro = "Invalid Token!";
            errorlog("Router: /api/v1/token/valid ","Inavlid Token: "+data);
            res.status(400).json({"response":400, "error":"Invalid Token!", "body":msg});
        }
    });
});
router.delete('/delete/:id',function(req,res,next){
    let id = (req.params.id!==undefined)?req.params.id:0;
        id = parseInt(id);
        console.log("DELETE ID: "+id);
    let now = moment().format("YYYY-MM-DD HH:mm:ss");
    let data = null;
    let InvoiceOrder = new InvoiceController();    
    let Invoice ={
        "is_active":0, 
        "desactive_at":now, 
        "id_invoive":id
    };
    let token = req.headers['x-access-token'];
    let Token = new TokenController();     
    Token.checkTokenValid(token,(resposta, msg) =>{
        let data = {"success":resposta, "erro":null, "message":msg};
        if(resposta){
          if(id>0){
            InvoiceOrder.deleteInvoiceControl(Invoice)
            .then((response) =>{
                if(response ){
                    data = { "Invoice_Deleted":response, "Invoice":Invoice};
                    successlog("Router: api/v1/invoices/delete/"+id,"Invoice deleted with sucess: "+JSON.stringify(data));
                    res.status(200).json({"response":200, "error":null, "body":response});
                }else{
                    successlog("Router:  api/v1/invoices/delete/"+id,"We can not delete invoice: "+JSON.stringify(data));
                    res.status(200).json({"response":200, "message":"We can not delete invoice!","error":null, "body":response});
                }
            }).catch((error) => {
                if(error!=={}){
                    errorlog("Router:  api/v1/invoices/delete/"+id,error);
                    res.status(400).json({"response":400, "error":"Is not possible to delete invoices now. Try again later.", "body":null});
                    }else{
                        data = { "Invoice_Deleted":response, "Invoice":Invoice};
                        successlog("Router:  api/v1/invoices/delete/"+id,"We  can not delete invoice: "+data);
                        res.status(202).json({"response":202, "message":"We  can not delete invoice: "+data["orderBy"],"error":null, "body":response});
                    }
            });
         }else{
            errorlog("Router:  api/v1/invoices/delete/"+id,error);
            res.status(400).json({"response":400, "error":"Is not possible to delete invoices now. Try again later.", "body":null});
         }
        }else{
            data.erro = "Invalid Token!";
            errorlog("Router: /api/v1/token/valid ","Inavlid Token: "+data);
            res.status(400).json({"response":400, "error":"Invalid Token!", "body":msg});
        }
    });
    

});
 module.exports=router;