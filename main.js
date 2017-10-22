require('dotenv').config();
var app = require('./app/server');

app.listen(process.env.PORT,function(){
  console.log('Server running!');
})