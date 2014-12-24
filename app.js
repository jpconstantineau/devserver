//*******************
// SETUP WEB SERVER
//*******************
var express = require("express"),
    app = express(),
    compression = require('compression'),
    bodyParser = require('body-parser')
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override');
	
var port = parseInt(process.env.PORT, 10) || 3000;
var servingfolder = __dirname + '\\..\\jpconstantineau.github.io';

app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static(servingfolder));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var restify = require('restify-nedb').mount;
var config = require('restify-nedb').config;
var Datastore = require('nedb');
var databaseUrl = servingfolder + '\\database\\objects.json'; 

//**********************************
// SETUP DATABASE AND REST ENDPOINT
//**********************************

db = {};
db.objects = new Datastore({ filename: databaseUrl, autoload: true });

var opts = {
  prefix: '/objects',
  ds: db.objects,
  maxAge:false
};

cfg = new config(opts);
api = new restify(cfg, app);

//*********************
// START WEB SERVER
//*********************
app.listen(port);
console.log("Simple server listening at http://localhost:" + port);
console.log('from:' + servingfolder)
console.log("REST Endpoint at:" + opts.prefix+'/v1');
console.log('from:' + databaseUrl)

