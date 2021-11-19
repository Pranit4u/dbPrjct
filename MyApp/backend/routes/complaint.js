const router = require('express').Router();
let ComplaintData = require('../models/complaint.model');

router.route('/add').post((req,res) => {
    const roll = req.body.roll;
    const mess = req.body.mess;
    const type = req.body.type;
    const detail = req.body.detail;

    const newComplaintData = new ComplaintData({
        resolved: false,
        roll,
        mess,
        type,
        detail
    });

    newComplaintData.save((err,result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send({message:"1"});
        }
    });
});
  
module.exports = router;