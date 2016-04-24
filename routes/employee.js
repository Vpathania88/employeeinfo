var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');


exports.employees=function(req,res){
             Employee.find({}, function(err,employees){
                  res.render('home',{employees:employees,session:req.session});
              });
}

exports.addEmployee=function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var dob=req.body.dob;
   var department=req.body.department;
   var gender =req.body.gender;
    
    
   //console.log("Author is :"+author);

   var newEmployee=new Employee();
   newEmployee.name=name;
   newEmployee.email=email;
   newEmployee.dob=dob;
   newEmployee.department=department;
   newEmployee.gender=gender;
    
   var lowercaseTitle=newEmployee.name.toLowerCase();
   var slug=lowercaseTitle.replace(/[^a-zA-Z0-9 ]/g, "");
   var addingHyphen=slug.replace(/\s+/g, '-');

   newEmployee.slug=addingHyphen;

   newEmployee.save(function(err,savedEmployee){
       if(err){
         console.log("Error : While saving the employee"+err);
         return res.status(500).send();
       }else{
         res.redirect("/");
       }
   });
}
exports.deleteEmployee=function(req,res){
   var employee_slug=req.params.slug;

     Employee.findOneAndRemove({slug:employee_slug}, function(err,employee){
                   if(err){
                     console.log("Error : While saving comments");
                     return res.status(500).send();
                   }else{
                     res.redirect('/');
                   }
        });
 }                
exports.updateEmployee = function(req,res){
     var employee_slug=req.params.slug;
    console.log(employee_slug);
     var update = {name: req.body.name,email:req.body.email,dob:req.body.dob,deparment:req.body.department,gender:req.body.gender };
     var options = {new: true};
     Employee.findOneAndUpdate({slug:employee_slug},update,options, function(err,employee){            
            if(err){
                console.log("Error : While saving comments");
                return res.status(500).send();
            }else{
                res.redirect('/');
            }
        });
 }
    
