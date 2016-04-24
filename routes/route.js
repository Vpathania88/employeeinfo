var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');


exports.home=function(req,res){
             Employee.find({}, function(err,employees){
                  res.render('home',{employees:employees});
              });
}

exports.addEmployee=function(req,res){
                    res.render('addEmployee');
                                    }
    
exports.getEmployee=function(req,res){
    var url=req.params.slug;
        Employee.findOne({slug:url}, function(err,employee){
        res.render('editEmployee',{employee:employee});
    });
}