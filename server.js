var express = require('express');
var http = require('http');
var app = express();
var path = require('path');

var server = http.createServer(app);
var port = 3000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.get('/',function(req,res){
  res.render('index');
});

server.listen(port,function(){
  console.log('server is running on'+ port)
});

module.exports = server;