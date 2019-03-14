
let InvoiceDao = require('../../model/invoice/invoice.dao');

class InvoiceController extends InvoiceDao{
    constructor(){
        super();        
    }
    getInvoiceControl(lstart, lend, orderBy){
        let start = parseInt(lstart);
        let end   = parseInt(lend);
        let orderAccept= ["ReferenceMonth", "ReferenceYear", "Document"];
        let orderByChecked = [];
        let orderByTam = orderBy.length;
        let orderAcceptTam = orderAccept.length;
        for(let i=0;i<orderByTam;i++){
            for(let j=0;j<orderAcceptTam;j++){
                if(orderBy[i]===orderAccept[j]){
                    orderByChecked.push(orderBy[i]);
                }
            }
        }
         return new Promise((resolve, reject) => {
             this.getInvoices(start, end, orderByChecked,(err,rows) =>{
                this.closeConnection();
                console.log("result: "+JSON.stringify(rows));                
                (err)?reject(err):resolve(rows);
             });
        }); 
    }
    deleteInvoiceControl(Invoice){
        return new Promise((resolve, reject) => {
            this.deleteInvoice(Invoice, (err) =>{
                (err)?reject(err):resolve("Invoice deleted with success!");
            });
        }); 
    }
 }
 module.exports=InvoiceController;
