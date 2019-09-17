const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 
if(process.env.NODE_ENV === 'test'){
    mongoose.connect('mongodb://ApiAuTEST', { useMongoClient: true })
}
mongoose.connect('mongodb://localhost/ApiAu');

const app = express();

//Middlewares
app.use(morgan('dev')); 
app.use(bodyParser.json());

//this is the new comment

//Routes
app.use('/users', require('./routes/users'));

// //Start the server
// const port = process.env.PORT || 3000;
// app.listen(port);
// console.log(`Server listening at ${port}`);

module.exports = app;
