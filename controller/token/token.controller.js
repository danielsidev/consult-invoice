let jwt      = require('jsonwebtoken');
let TokenDao = require('../../model/token/token.dao');
let toBase64 = function(valor){ return new Buffer(valor).toString('base64');};
let fromBase64 = function(valor){ return new Buffer(valor, 'base64').toString('ascii'); };
let secret = "catalog_disks";
class TokenController extends TokenDao{
  constructor(){
    super();
    this.Token  = new TokenDao();
  }
  checkTokenExistLoginOne(token,callback){
    let tokenOpen ={"token":token};
    //token.dao
    this.checkTokenExist(tokenOpen,callback);
  }
  checkTokenExistOne(token,callback){
    let tokenOpen ={"token":token};
    //token.dao
    this.checkTokenExist(tokenOpen,callback);
  }
  checkTokenValid(token, callback){
    jwt.verify(token, secret, function(err, decoded) {
       if (err) { //failed verification.
         callback(false, "Token Expirou!");
       }else{
          let msg = "Token Válido: "+JSON.stringify(decoded);
          callback(true, msg);
       }
     });
  }

  checkTokenPromise(tk){
    return new Promise( (resolve, reject) => {
      let token = tk;
      this.checkTokenExistOne(token,(err,retorno) => {
          if(!err){ //Se token(retorno) informando já existe na blacklist: precisa fazer login
            if(retorno.length>0){
              //callback(false, "Token Inválido!");
              reject("Token inválido!");
            }else{
                jwt.verify(token, secret,(err, decoded) => {
                    if(err) { //failed verification.
                      console.error("ERRO: "+JSON.stringify(err));
                      //callback(false, "Token Expirou!");
                      reject("Token Expirou!");
                    }else{
                      let msg = "Token Válido: "+JSON.stringify(decoded);
                      resolve(msg);
                      //callback(true, msg);
                    }
                  });
            }
          }else{ callback(false, "Token Inexistente!"); }
      });
    });
}
  checkTokenBlackList(tk, callback){
      let token = tk;
      this.checkTokenExistOne(token,function(err,retorno){
          if(!err){ //Se token(retorno) informando já existe na blacklist: precisa fazer login
            if(retorno.length>0){
              callback(false, "Token Inválido!");
            }else{
                jwt.verify(token, secret, function(err, decoded) {
                    if(err) { //failed verification.
                      console.log("ERRO: "+JSON.stringify(err));
                      callback(false, "Token Expirou!");
                    }else{
                      let msg = "Token Válido: "+JSON.stringify(decoded);
                      callback(true, msg);
                    }
                  });
            }
          }else{ callback(false, "Token Inexistente."); }
      });
  }
  checkTokenLogin(token,codeSession, res){

      this.checkTokenExistLoginOne(token,function(err,retorno){
          if(!err){
              if(retorno.length>0){//Se token(retorno) gerado já existe na blacklist, gera outro.
                this.createToken(codeSession, res);
              }else{
                let tk = token; 
                res.status(200).json( { response:200, dados:codeSession, error:null, body: "Token Created!",token:tk} );
              }
          }else{res.status(400).json( { response:400, dados:null, error:err, body:""} );}
      });
  }
  createToken(codeSession, res){
    let token = jwt.sign({data:codeSession},secret, {expiresIn:3600});//3600=1h// 4200=2h //86400 segundos=24h
    this.checkTokenLogin(token, codeSession, res);
  }
  addTokenBlackList(tk,callback){
    let dados={
    "id"   :tk.id,
    "token":tk.token,
    "data" :tk.data,
    "hora" :tk.hora
    };
    this.Token.addToken(dados,callback);
  }
}
module.exports=TokenController;