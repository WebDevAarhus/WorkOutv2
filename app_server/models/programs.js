var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    repstime: {type: String, required: true},
    sets: {type:Number, default:0},
    description: {type: String, required: true}
});

var programSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    difficulty: {type:Number, default:0},
    exercises: [exerciseSchema]
});

mongoose.model('Program', programSchema);