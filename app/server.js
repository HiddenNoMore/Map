var express = require('express');

var app = express();

//sets variables
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public/views/');


//serves static files and app.use means it is called from every request
app.use(express.static(__dirname + '/../public'));

require('./routes.js')(app);

module.exports = app;