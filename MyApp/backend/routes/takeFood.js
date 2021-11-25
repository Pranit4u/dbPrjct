const router = require('express').Router();
let MealData = require('../models/meal.model');

router.route('/add').post((req,res) => {
    const roll = req.body.roll;
    const date = req.body.date;
    const meal = req.body.meal;
    const mess = req.body.mess;
    const newMealData = new MealData({
        roll,
        date,
        meal,
        mess
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

router.route('/get').get((req,res) => {
    const mess = req.query.mess;
    const date = req.query.date;

    MealData.find({mess: mess, date: date})
        .then(mealData => res.json(mealData))
        .catch(err => res.status(400).json('Error: '+ err));
});
  
module.exports = router;