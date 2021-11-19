const router = require('express').Router();
let StudentData = require('../models/student.model');

router.route('/add').post((req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const roll = req.body.roll;
    const batch = req.body.batch;
    const mess = req.body.mess;
    const mob = req.body.mob;
    const email = req.body.email;
    const password = req.body.password;

    const newStudentData = new StudentData({
        firstname,
        lastname,
        roll,
        batch,
        mess,
        mob,
        email,
        password,
    });

    newStudentData.save()
        .then(() => res.send({message: "1"}))
        .catch(err => res.status(400).json('Error: '+ err));
});
  
module.exports = router;