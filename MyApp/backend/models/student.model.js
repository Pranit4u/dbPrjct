const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    mob: {type: String, required: true},
    roll: {type: String, required: true},
    batch: {type: String, required: true},
    mess: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
});

const StudentData = mongoose.model('StudentData',studentSchema);

module.exports = StudentData;