const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
    breakfast: {type: Array, required: true},
    lunch: {type: Array, required: true},
    dinner: {type: Array, required: true},
    date: {type: String, required: true}
});

const MenuData = mongoose.model('MenuData',menuSchema);

module.exports = MenuData;