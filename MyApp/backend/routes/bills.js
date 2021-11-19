const router = require('express').Router();
let BillData = require('../models/bills.model');
let MealData = require('../models/meal.model')
router.route('/get').get((req,res) => {
    const roll = req.query.roll
    BillData.find({roll: roll, paid:false})
        .then(menuData => res.json(menuData))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/generate').get((req,res) => {
    const sub = req.query.sub
    MealData.find({"date" : {$regex : sub}})
        .then(mealData => res.json(mealData))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/upload').post((req,res) => {
    const bills = req.body.bills;
    const data = [];
    let d = new Date();
    let m = d.getMonth();
    Object.keys(bills).map((roll,index) => {
        data.push({roll: roll, amount: bills[roll], month: m, paid: false});
    })

    BillData.collection.insertMany(data,onInsert);
    function onInsert(err, docs) {
        if (err) {
            res.send("0")
        } else {
            res.send({message:"1"})
            console.info('bills were successfully stored.');
        }
    }
});
  

router.route('/add').post((req,res) => {



    const cost = req.body.cost;

    const newMenuData = new MenuData({
      
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