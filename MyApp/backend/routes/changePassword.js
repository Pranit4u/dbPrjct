const router = require('express').Router();
let UpdateData = require('../models/student.model');

router.route('/add').post((req,res) => {
    const {roll,oldPassword,newPassword1,newPassword2} =req.body;

    UpdateData.findOne({roll:roll},(err,user)=>{
        if(err) {
            res.send({message:"-1"})
            throw err;
        }
        if(user){
           if(oldPassword === user.password){
                var myquery = { roll: user.roll };
                var newvalues = {$set: {password: newPassword1}};
            
                UpdateData.updateOne(myquery,newvalues,function(e, res1) {
                    if (e) throw e;
                    if(res1){
                    console.log("password updated");
                    res.send({message:"1"})
                    }
                });
           }else{
               res.send({message:"0"})
           }
        }
    })
    
});
  
module.exports = router;