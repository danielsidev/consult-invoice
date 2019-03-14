'use strict';
var mysql=require('mysql');
class MySQLClient
{
	constructor()
	{
		this.connection = null;
		this.dbconfig = {
						"dev":{
								connectionLimit : 10,
								host:'localhost',
								user:'admStone',
								password:'admStone',
								database:'stone',
								timezone: 'utc' 
								}
						,"prod":{
								connectionLimit : 10,
								host:'localhost',
								user:'admStone',
								password:'admStone',
								database:'stone',
								timezone: 'utc' 
								}
						};
						switch(process.env.NODE_ENV){
							case 'dev':
								 this.connection = mysql.createPool(this.dbconfig.dev);
								 break;
							case 'prod':
								this.connection = mysql.createPool(this.dbconfig.prod);
								break;
							default:
								this.connection = mysql.createPool(this.dbconfig.prod);
								break;
						}				
		
	}

	getConnection()
	{
		return this.connection;
	}

	closeConnection()
	{
		this.connection.end();
	}
}

module.exports = MySQLClient;

