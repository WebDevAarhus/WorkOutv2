var mongoose = require('mongoose');
var Prog = mongoose.model('Program');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var doAddExercise = function(req, res, program){
    if(!program){
        sendJsonResponse(res, 404,{
            "message":"location not found"
        });
    }else{
        program.exercises.push({
            name: req.body.name,
            repstime: req.body.repstime,
            sets: req.body.sets,
            description: req.body.description
            
        });

        program.save(function(err, program){
            var addedExercise;
            if(!err){
                addedExercise = program.exercises[program.exercises.length-1];
                sendJsonResponse(res, 201, addedExercise);
            }else{
                sendJsonResponse(res, 400, err);
            }
        });
    }
}

/*POST actual exercise creation */
module.exports.createExercise = function(req,res){
    var programid = req.params.programid;
    if(programid){
        Prog
        .findById(programid)
        .select('exercises')
        .exec(function(err, program){
            if(!err){
                doAddExercise(req, res, program);
            }else{
                sendJsonResponse(res, 400, err);
            }
            
        });
    }else{
        sendJsonResponse(res, 404, {
            "message":"program not found"
        })
    }
};

module.exports.exerciseInfo = function(req,res){
    if(req.params && req.params.programid && req.params.exerciseid){
        Prog
        .findById(req.params.programid)
        .select('name exercises')
        .exec(function(err, program){
            var response, exercise;
            if(!program){
                sendJsonResponse(res, 404, {
                    "message":"no program of such id"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            if(program.exercises && program.exercises.length > 0){
                exercise = program.exercises.id(req.params.exerciseid);
                if(!exercise){
                    sendJsonResponse(res, 404,{
                        "message":"no exercise of such id"
                    });
                }else{
                    response = {
                        program:{
                            name: program.name,
                            id: req.params.programid
                        },
                        exercise: exercise
                    };
                    sendJsonResponse(res, 200, response);
                }
            }else{
                sendJsonResponse(res, 404, {
                    "message": "no exercises found"
                });
            }
        });
    }else{
        sendJsonResponse(res, 404,{
            "message":"Not found, programid and exerciseid are both required"
        });
    }
};
