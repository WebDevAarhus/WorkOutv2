var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name: String,
    repstime: Number,
    description: String
});

var programSchema = new mongoose.Schema({
    name: String,
    author: String,
    difficulty: Number,
    exercises: [exerciseSchema]
});

mongoose.model('Program', programSchema);