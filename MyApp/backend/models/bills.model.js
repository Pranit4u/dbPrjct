const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    roll: {type: String, required: true},
    amount: {type: Number, required: true},
    month: {type: Number, required: true},
    paid: {type: Boolean, required: true}
});

const BillData = mongoose.model('BillData',billSchema);

module.exports = BillData;