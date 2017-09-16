var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://protected-everglades-43328.herokuapp.com";
} 

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh no. We can't find this page :<";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "Ups. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        text : content
    });
};

var getProgramInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/programs/" + req.params.programid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
            function(err, response, body) {
            if (response.statusCode === 200) {
                callback(req, res, body);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};


var renderExerciseForm = function(req, res, programData){
    res.render('program-exercise-form', {
        title:'Add exercise to ' + programData.name,
        pageHeader:{
            title:'Add exercise to ' + programData.name
        },
        error: req.query.err
    });
};

/*GET add exercise page*/
module.exports.addExerciseForm = function(req,res){
    getProgramInfo(req, res, function(req, res, programData){
        renderExerciseForm(req, res, programData);
    });
    
};

/*POST actual exercise creation*/
module.exports.createExercise = function(req,res){
    var requestOptions, path, programid, postdata;
    programid = req.params.programid;
    path = "/api/programs/" + programid + "/exercises";
    postdata = {
        name: req.body.name,
        repstime: req.body.repstime,
        sets: req.body.sets,
        description: req.body.description
    };

    requestOptions = {
        url : apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    if(!postdata.name || !postdata.repstime || !postdata.sets || !postdata.description){
        res.redirect('/programs/' + programid + '/exercises/new?err=val');
    }else{
        request(
            requestOptions,
            function(err, response, body){
                if(response.statusCode === 201){
                    res.redirect('/programs/' + programid);
                }else if(response.statusCode === 400 &&
                    body.name && body.name === "ValidationError"){
                    res.redirect('/programs/' + programid + '/exercises/new?err=val');
                }else{
                    console.log(body);
                    _showError(req,res,response.statusCode);
                }
            }
        );
    }
};
