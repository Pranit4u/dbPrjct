const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    roll: {type: String, required: true},
    date: {type: String, required: true},
    meal: {type: Object, required: true},
    mess: {type: String, required: true},
    
});

const MealData = mongoose.model('MealData',mealSchema);

module.exports = MealData;