const MySQLClient  = require('../connection/MySQLClient');
class InvoiceDao extends MySQLClient{
  constructor(){
    super();
    this.db    = this.getConnection();
    this.table = "invoice";
  }
  getInvoices(start, end, orderBy, callback){
    let orderByString = orderBy.toString();
    let sql  = "Select * from "+this.table+" order by "+orderByString+" desc limit ?, ?";
    let args = [start, end];
    this.db.query(sql, args, callback);
  }
  
  getInvoicesFilter(start, end, filter, callback){
  
    let sql  ="";
    if(filter.name==="ReferenceMonth"){
      sql =  "Select * from "+this.table+" where ReferenceMonth=?  order by idInvoice desc limit ?, ?";
    }else if(filter.name==="ReferenceYear"){
      sql =  "Select * from "+this.table+" where ReferenceYear=?  order by idInvoice desc limit ?, ?";
    }else if(filter.name=="Document"){
      sql =  "Select * from "+this.table+" where Document=?  order by idInvoice desc limit ?, ?";
    }

    let filterN = parseInt(filter.value);
    let args = [filterN, start, end];
    console.log("SQL: "+sql);
    console.log("Filter: "+filterN);
    console.log("Start: "+start);
    console.log("End: "+end);
    this.db.query(sql, args, callback);
  }
  deleteInvoice(Invoice, callback){
    let sql  =  "update "+this.table+" set IsActive=?, DesactiveAt=?  where IdInvoice=?";
    let args = [Invoice.is_active, Invoice.desactive_at, Invoice.id_invoice];
    this.db.query(sql, args,callback); 
  }
}
module.exports = InvoiceDao;
