const router = require('express').Router();
let StudentData = require('../models/student.model');
let ContractorData = require('../models/contractor.model');
router.route('/add').post((req,res) => {
    const {isStud,email,password} =req.body;
    if(isStud === "student"){
        StudentData.findOne({email:email},(err,user)=>{
            if(err) throw err;
            if(user){
               if(password === user.password){
                   res.send({message:user})
               }else{
                   res.send({message:"0"})
               }
            }else{
                res.send({message:"-1"})
            }
        })
    }
    else{
        ContractorData.findOne({email:email},(err,user)=>{
            if(err) throw err;
            if(user){
               if(password === user.password){
                   res.send({message:user})
               }else{
                   res.send({message:"0"})
               }
            }else{
                res.send({message:"-1"})
            }
        })
    }
});
  
module.exports = router;