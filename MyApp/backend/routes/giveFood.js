const router = require('express').Router();
let MenuData = require('../models/menu.model');

function getCurrentDate(){
    const separator = "-";
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

router.route('/add').post((req,res) => {
    const breakfast = req.body.b;
    const lunch = req.body.l;
    const dinner = req.body.d;
    const date = getCurrentDate();

    const newMenuData = new MenuData({
        breakfast,
        lunch,
        dinner,
        date
    });

    newMenuData.save((err,result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send({message:"1"});
        }
    });
});
  
module.exports = router;