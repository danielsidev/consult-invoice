let errorlog          = require('../util/logger').errorlog;
let successlog        = require('../util/logger').successlog;
let express           = require('express');
let router            = express();
const moment          = require("moment");
const TokenController = require('../controller/token/token.controller');

//CHEK VALID TOKEN
router.get('/valid',(req,res,next) => {
    let token = req.headers['x-access-token'];
    let Token = new TokenController();     
    Token.checkTokenValid(token,(resposta, msg) =>{
        let data = {"success":resposta, "erro":null, "message":msg};
        if(resposta){
            successlog("Router: /api/v1/token/valid ","We Found Posts in this period: "+data);
            res.status(200).json({"response":200, "error":null, "body":msg});
        }else{
            data.erro = "Invalid Token!";
            errorlog("Router: /api/v1/token/valid ","Inavlid Token: "+JSON.stringify(data));
            res.status(401).json({"response":401, "error":"Invalid Token!", "body":msg});
        }
    });
});
 
//CREATE NEW TOKEN
router.post('/create',(req,res,next) => {
    let login    = req.body.login;
    let password = req.body.password;
    let data = {};
    if(login==="stoneTest" && password==="$T0n&n3t&s5"){
        let Token = new TokenController();     
        let codeSession = moment().format("YYYY-MM-DD HH:mm:ss");
        Token.createToken(codeSession,res);
        successlog("Router: /api/v1/token/create ","Created Token");
    }else{
        errorlog("Router: /api/v1/token/create","Can not create Token");
        res.status(400).json({"response":400, "error":"Invalid data to create Token!", "body":"Login or password invalid!"});
    }
});

module.exports=router;