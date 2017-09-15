var mongoose = require('mongoose');
var Prog = mongoose.model('Program');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


/*GET programs page*/
module.exports.programsList = function(req,res){
    Prog
    .find({})
    .exec(function(err, programs){
        if(!err){
            sendJsonResponse(res, 200, programs);
        }else{
            sendJsonResponse(res, 404,"no programs found");
        }
/*            title:'Programs list',
            sidebar: 'Hello and welcome to programs list page!',
            pageHeader:{
                strapline: "Below you can see the workouts list"
            },
            programs
        });*/
    });
    
};

/*GET program info page*/
module.exports.programInfo = function(req,res){
    var programid = req.params.programid;
    if(req.params && programid){
        Prog
        .findById(programid)
        .exec(function(err, program){
            if(!program){
                sendJsonResponse(res, 404, {
                    "message":"no program of such id"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, program);
            /* {
                    title:'Program info',
                    pageHeader:{
                        title:program.name,
                        author:program.author
                    },
                    program
                }
            */
        });
    }else{
        sendJsonResponse(res, 404,{
            "message":"no programID in request"
        });
    }
};

/*POST program creation*/
module.exports.createProgram = function(req,res){
    Prog
    .create({
        name: req.body.name,
        author: req.body.author,
        difficulty: req.body.difficulty
    },function(err, program){
        if(!err){
            sendJsonResponse(res, 201, program);
        }else{
            sendJsonResponse(res, 400, err);
        }
    });
   
};

/*PUT update program*/
module.exports.updateProgram = function(req,res){
    if(!req.params.programid){
        sendJsonResponse(res, 404,{
            "message":"no program id provided"
        });
        return;
    }
    Prog
    .findById(req.params.programid)
    .select('-exercises')
    .exec(
        function(err, program){
            if(!program){
                sendJsonResponse(res, 404,{
                    "message":"program not found"
                });
                return;
            }else if(err){
                sendJsonResponse(res, 400, err);
                return;
            }
            program.name = req.body.name;
            program.author = req.body.author;
            program.difficulty = parseInt(req.body.difficulty);

            program.save(function(err, program){
                if(!err){
                    sendJsonResponse(res, 201, program);
                }else{
                    sendJsonResponse(res, 400, err);
                }
            })
        }
    );


};
