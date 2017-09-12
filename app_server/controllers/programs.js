var mongoose = require('mongoose');
var Prog = mongoose.model('Program');

/*GET programs page*/
module.exports.programsList = function(req,res){
    Prog
    .find({})
    .exec(function(err, programs){
        res.render('programs-list', {
            title:'Programs list',
            sidebar: 'Hello and welcome to programs list page!',
            pageHeader:{
                strapline: "some strapline?"
            },
            programs
        });
    });
    
};

/*GET program info page*/
module.exports.programInfo = function(req,res){
    var programid = req.params.programid;
    Prog
    .findById(programid)
    .exec(function(err, program){
        if(!err){
            res.render('program-info', {
                title:'Program info',
                pageHeader:{
                    title:program.name,
                    author:program.author
                },
                program
            });
        }
    });
};
    
/*GET add program page*/
module.exports.addProgramForm = function(req,res){
    res.render('program-form', {
        title:'Add program',
        pageHeader:{
            title:'Add a program'
        },

    })
};

/*actual program creation page*/
module.exports.createProgram = function(req,res){
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
   
};

