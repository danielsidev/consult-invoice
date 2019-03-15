let errorlog          = require('../../util/logger').errorlog;
let successlog        = require('../../util/logger.js').successlog;
let moment          = require("moment");
    moment.locale('pt-br');
let TokenController   = require('../token/token.controller');
let InvoiceController = require('./invoice.controller');
class InvoiceBusiness extends InvoiceController{
    constructor(tokenSession){
        super();
        this.id           = 0,
        this.month        = null,
        this.year         = null,
        this.doc          = null,
        this.start        = 0
        this.end          = 10,
        this.order_by     = [],
        this.order_check  = [],
        this.data         = null,
        this.token        = tokenSession,
        this.is_active    = 0, 
        this.desactive_at = moment().format("YYYY-MM-DD HH:mm:ss"),
        this.tokenControl = new TokenController()
    }    
    setDataFilter(dataBusiness){
        this.month        = (dataBusiness.month!==undefined)?dataBusiness.month:null,
        this.year         = (dataBusiness.year!==undefined)?dataBusiness.year:null,
        this.doc          = (dataBusiness.doc!==undefined)?dataBusiness.doc:null,
        this.start        = (dataBusiness.start!==undefined)?dataBusiness.start:0
        this.end          = (dataBusiness.end!==undefined)?dataBusiness.end:10
    }
    getDataFilter(){
        let data = {
            "start":this.start,
            "end"  :this.end,
            "month":this.month,
            "year" :this.year,
            "doc"  :this.doc
        }
        return data;
    }
    setOrderBy(data){
        this.order_by.push(data);
    }    
    getOrderBy(){
        return this.order_by;
    }
    setOrderCheck(){
        this.order_check.push(this.getDataFilter().month);
        this.order_check.push(this.getDataFilter().year);
        this.order_check.push(this.getDataFilter().doc);
    }
    getOrderCheck(){
        return this.order_check;
    }
    setIdInvoice(idInvoice){
        let i = (idInvoice!==undefined)?idInvoice:0;
        this.id = parseInt(i);
    }
    getIdInvoice(){
        return this.id;
    }
    getIsActive(){
        return this.is_active;
    }
    getDesactiveAt(){
        return this.desactive_at;
    }
    getInvoiceDel(){
        return {
            "is_active":this.getIsActive(), 
            "desactive_at":this.getDesactiveAt(), 
            "id_invoice":this.getIdInvoice()
        }        
    }
    /**Return a list from invoices */
    getInvoiceList(res){
        this.tokenControl.checkTokenValid(this.token,(resposta, msg) =>{
            let data = {"success":resposta, "erro":null, "message":msg};
            if(resposta){
                this.getOrderCheck().map(order => { if(order!=null){this.setOrderBy(order);} });
                if(typeof this.order_by === 'object'){
                    let tamOrder = this.getOrderBy().length;        
                    if(tamOrder > 0){        
                        this.getInvoiceControl(this.getDataFilter().start, this.getDataFilter().end, this.getOrderBy())
                        .then((response) =>{
                            if(response && response.length >0){
                                data = { "orderBy":this.getOrderBy()};
                                successlog("Router: api/v1/invoices/list/ ","We Found Invoices order by: "+data);
                                res.status(200).json({"response":200, "error":null, "body":response});
                            }else{
                                successlog("Router: api/v1/invoices/list/ ","We Not Found Invoices order by: "+data);
                                res.status(202).json({"response":202, "message":"We Not Found Invoices order by "+data["orderBy"],"error":null, "body":response});
                            }
                        })
                        .catch((error) => {
                            console.log("ERROR: "+JSON.stringify(error));
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
    }
    /** Delete one invoice */
    getInvoiceDelete(res){
    this.tokenControl.checkTokenValid(this.token,(resposta, msg) =>{
         let data = {"success":resposta, "erro":null, "message":msg};
        if(resposta){
          if(this.getIdInvoice()>0){            
            this.deleteInvoiceControl(this.getInvoiceDel())
            .then((response) =>{
                if(response ){
                    data = { "Invoice_Deleted":response, "Invoice":this.getInvoiceDel()};
                    successlog("Router: api/v1/invoices/delete/"+this.getIdInvoice(),"Invoice deleted with sucess: "+JSON.stringify(data));
                    res.status(200).json({"response":200, "error":null, "body":response});
                }else{
                    successlog("Router:  api/v1/invoices/delete/"+this.getIdInvoice(),"We can not delete invoice: "+JSON.stringify(data));
                    res.status(200).json({"response":200, "message":"We can not delete invoice!","error":null, "body":response});
                }
            }).catch((error) => {
                if(error!=={}){
                    errorlog("Router:  api/v1/invoices/delete/"+this.getIdInvoice(),error);
                    res.status(400).json({"response":400, "error":"Is not possible to delete invoices now. Try again later.", "body":null});
                    }else{
                        data = { "Invoice_Deleted":response, "Invoice":this.getInvoiceDel()};
                        successlog("Router:  api/v1/invoices/delete/"+this.getIdInvoice(),"We  can not delete invoice: "+data);
                        res.status(202).json({"response":202, "message":"We  can not delete invoice: "+data["orderBy"],"error":null, "body":response});
                    }
            });
         }else{
            errorlog("Router:  api/v1/invoices/delete/"+this.getIdInvoice(),error);
            res.status(400).json({"response":400, "error":"Is not possible to delete invoices now. Try again later.", "body":null});
         }
        }else{
            data.erro = "Invalid Token!";
            errorlog("Router: /api/v1/token/valid ","Inavlid Token: "+data);
            res.status(400).json({"response":400, "error":"Invalid Token!", "body":msg});
        }
    });
    }

 }
 module.exports=InvoiceBusiness;
