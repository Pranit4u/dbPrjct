const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    resolved: {type: Boolean, required: true},
    roll: {type: String, required: true},
    mess: {type: String, required: true},
    type: {type: String, required: true},
    detail: {type: String, required: true}
});

const ComplaintData = mongoose.model('ComplaintData',complaintSchema);

module.exports = ComplaintData;