let express   = require('express');
let appRouter = express(); 
let Invoices  = require("./invoice.router.js"); 
let Token     = require("./token.router.js"); 
appRouter.use('/invoices',Invoices);
appRouter.use('/token',Token);

module.exports = appRouter;