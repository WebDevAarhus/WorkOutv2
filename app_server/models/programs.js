var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name: String,
    repstime: Number,
    sets: {type:Number, default:0},
    description: String
});

var programSchema = new mongoose.Schema({
    name: String,
    author: String,
    difficulty: {type:Number, default:0},
    exercises: [exerciseSchema]
});

mongoose.model('Program', programSchema);