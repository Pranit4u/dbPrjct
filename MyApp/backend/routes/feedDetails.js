const router = require('express').Router();
let StudentData = require('../models/student.model');

router.route('/get').get((req,res) => {
    const mess = req.query.mess
    StudentData.find({mess: mess})
        .then(stundentData => res.json(stundentData))
        .catch(err => res.status(400).json('Error: '+ err));
});

  
module.exports = router;