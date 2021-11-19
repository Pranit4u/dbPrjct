const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contractorSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    mob: {type: String, required: true},
    mess: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
});

const ContractorData = mongoose.model('ContractorData',contractorSchema);

module.exports = ContractorData;