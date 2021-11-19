const router = require('express').Router();
let MealData = require('../models/meal.model');

router.route('/add').post((req,res) => {
    const roll = req.body.roll;
    const date = req.body.date;
    const meal = req.body.meal;

    const newMealData = new MealData({
        roll,
        date,
        meal
    });

    newMealData.save((err,result) => {
        if (err){
            console.log(err);
        }
        else{
            res.send({message:"1"});
        }
    });
});
  
module.exports = router;