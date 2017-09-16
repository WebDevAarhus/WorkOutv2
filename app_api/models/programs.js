var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    repstime: {type: String, required: true},
    sets: {type:Number, default:0},
    description: {type: String, required: true}
});

var logSchema = new mongoose.Schema({
    username: {type: String, required: true},
    date: {type:Date, required:true}
});

var programSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    difficulty: {type:Number, default:0},
    exercises: [exerciseSchema],
    logs : [logSchema]
});

mongoose.model('Program', programSchema);