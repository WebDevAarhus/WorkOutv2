var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://protected-everglades-43328.herokuapp.com/";
} 

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
                strapline: "Below you can see the workouts list"
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

/*POST actual program creation page*/
module.exports.createProgram = function(req,res){
    Prog
    .create({
        name: req.body.name,
        author: req.body.author,
        difficulty: req.body.difficulty
    },function(err, program){
        if(!err){
            res.redirect('/');
        }else{
            res.render('generic-text',{
                title:'arrrrrr',
                text:'please try filling the form once more, you put the wrong data'
            })
        }
    });
   
};

