const router = require('express').Router();
let UpdateData = require('../models/student.model');

router.route('/add').post((req,res) => {
    const user = req.body;

    var myquery = { roll: user.roll };
    var newvalues = {$set: {firstname: user.firstname, lastname: user.lastname, mob: user.mob}}
    UpdateData.updateOne(myquery,newvalues,function(err, res1) {
        if (err) throw err;
        if(res1){
          console.log("1 document updated");
          res.send({message:"1"})
        }
        else{
          res.send({message:"0"})
        }
      })
});
  
module.exports = router;