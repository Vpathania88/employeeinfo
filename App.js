var express=require('express');
var mongoose=require('mongoose');
var db=require('./models/db.js');
var chalk = require('chalk');

var routes=require('./routes/route.js');
var employee=require('./routes/employee.js');
var bodyParser=require('body-parser');

var app=express();
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',routes.home);

app.get('/employees',employee.employees);

app.get('/addEmployee',routes.addEmployee);
app.post('/updateEmployee/:slug',employee.updateEmployee);

app.get('/editEmployee/:slug',routes.getEmployee);

app.get('/deleteEmployee/:slug',employee.deleteEmployee);

app.post('/saveEmployee',employee.addEmployee);




app.use(function(req, res) {
     console.log(chalk.red("Error: 404"));
     res.status(404).render('404');
});

app.use(function(error, req, res, next) {
     console.log(chalk.red('Error : 500'+error))
     res.status(500).render('500');
});

var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});
