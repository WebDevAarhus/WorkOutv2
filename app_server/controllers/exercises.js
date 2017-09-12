var mongoose = require('mongoose');
var Prog = mongoose.model('Program');


/*GET add exercise page*/
module.exports.addExerciseForm = function(req,res){
    res.render('program-exercise-form', {
        title:'Add exercise',
        pageHeader:{
            title:'Add an exercise'
        }
    })
};

var doAddExercise = function(req, res, program){
    program.exercises.push({
        name: req.body.name,
        repstime: req.body.repstime,
        sets: req.body.sets,
        description: req.body.description
        
    });

    program.save(function(err, program){
        var exercise = program.exercises[program.exercises.length-1];
        if(!err){
            res.redirect('/programs/' + program._id);
        /*            
            res.render('exercise-added', {
                title:'Adding successful',
                pageHeader:{
                    title:'You have created an exercise'
                },
                exercise
            })*/
        }
    });
}


/*POST actual exercise creation page*/
module.exports.createExercise = function(req,res){
    var programid = req.params.programid;
    console.log("-------" + programid);
    Prog
    .findById(programid)
    .exec(function(err, program){
        doAddExercise(req, res, program);
    });

    

    /*
    Prog
    .create({
        name: req.body.name,
        author: req.body.author,
        difficulty: req.body.difficulty
    },function(err, program){
        if(!err){
            res.render('program-added', {
                title:'Adding successful',
                pageHeader:{
                    title:'You have created a program'
                },
                program
            })
        }
    });
   */
};
