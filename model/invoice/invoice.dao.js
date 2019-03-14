const MySQLClient  = require('../connection/MySQLClient');
class InvoiceDao extends MySQLClient{
  constructor(){
    super();
    this.db    = this.getConnection();
    this.table = "invoice";
  }
  getInvoices(start, end, orderBy, callback){
    let order = "";  
    let orderByString = orderBy.toString();
    let sql = "Select * from "+this.table+" order by "+orderByString+" desc limit ?, ?";
    let args = [ start, end];
    this.db.query(sql, args, callback);
  }
  
  deleteInvoice(Invoice, callback){
    let sql =  "update  "+this.table+" set IsActive=?, DesactiveAt=?  where IdInvoice=?";
    let args = [Invoice.is_active, Invoice.desactive_at, Invoice.id_invoive];
    this.db.query(sql, args,callback); 
  }
}
module.exports = InvoiceDao;
