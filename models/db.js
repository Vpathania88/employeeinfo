var chalk = require('chalk');
var mongoose = require('mongoose');

//var dbURI = 'mongodb://localhost/test';

var dbURI = 'mongodb://vpathania88:abc123@ds061365.mlab.com:61365/employeedirectory';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});



var employeeSchema=  new mongoose.Schema({
  name: {type: String,unique:true},
  email: {type: String, unique:true},
  dob:{type:Date,default:Date.now},
  department:String,
  gender: {type: String},
  slug:String
});

// Build the User model

mongoose.model('Employee', employeeSchema,'employees');
