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
        if(!err){
            res.redirect('/programs/' + program._id);
        }else{
            res.render('generic-text',{
                title:'errrrrr',
                text: 'oh no, you didn\'t fill the form correctly'
            })
        }
    });
}


/*POST actual exercise creation page*/
module.exports.createExercise = function(req,res){
    var programid = req.params.programid;
    Prog
    .findById(programid)
    .exec(function(err, program){
        doAddExercise(req, res, program);
    });

};
