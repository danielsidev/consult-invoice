const MySQLClient  = require('../connection/MySQLClient');

class TokenDao extends MySQLClient{
  constructor(){
    super();
    this.db    = this.getConnection();
      this.table = "token_blacklist";
  }
  getAllTokens(callback){
    this.db.query("Select * from "+this.table,callback);
  }
   getTokenById(id,callback){
     this.db.query("select * from "+this.table+" where idtoken=? ",[id],callback);
   }
   checkTokenExist(Token,callback){
     this.db.query("select * from "+this.table+" where token=?",[Token.token],callback);
   }
   addToken(Token,callback){
   this.db.query("Insert into "+this.table+" values(?,?,?,?)",[Token.id,Token.token,Token.data, Token.hora],callback);
   }
   deleteToken(id,callback){
    this.db.query("delete from  "+this.table+" where idtoken=?",[id],callback);
   }
   updateToken(id,Token,callback){
    this.db.query("update  "+this.table+" set token=?, data_token=?, hora_token=?  where idtoken=?",[Token.token, Token.data, Token.hora,id],callback);
   }
}
 module.exports=TokenDao;