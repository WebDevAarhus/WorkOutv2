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

var renderHomepage = function(req, res, responseBody){
    var message;
    if(!(responseBody instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    }else{
        if(!responseBody.length){
            message = "No programs found";
        }
    }
    res.render('programs-list', {
        title:'Programs list',
        sidebar: 'Hello and welcome to programs list page!',
        pageHeader:{
            strapline: "Below you can see the workouts list"
        },
        programs : responseBody,
        message: message
    });
};


/*GET programs page*/
module.exports.programsList = function(req,res){
    var requestOptions, path;
    path = '/api/';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs : {}
    };

    request(
        requestOptions,
        function(err, response, body){
            renderHomepage(req, res, body);
        }
    );
};

var renderProgramInfo = function(req, res, programData){
    res.render('program-info', {
        title:'Program info',
        pageHeader:{
            title:programData.name,
            author:programData.author
        },
        program : programData
    });
};

/*GET program info page*/
module.exports.programInfo = function(req,res){
    getProgramInfo(req, res, function(req, res, responseData){
            renderProgramInfo(req, res, responseData)
        });
};

var renderProgramForm = function(req, res){
    console.log(">> in renderProgramForm");
    
    res.render('program-form', {
        title:'Add program',
        pageHeader:{
            title:'Add a new program'
        },
        error: req.query.err
    });
};

/*GET add program page*/
module.exports.addProgramForm = function(req,res){
    console.log(">> in addProgramForm");
    renderProgramForm(req, res);
   
};

/*POST actual program creation*/
module.exports.createProgram = function(req,res){
    console.log(">> in createProgram");
    var requestOptions, path, postdata;
    path = "/api/programs";
    postdata = {
        name: req.body.name,
        author: req.body.author,
        difficulty: req.body.difficulty
    };

    requestOptions = {
        url : apiOptions.server + path,
        method: "POST",
        json: postdata
    };

    if(!postdata.name || !postdata.author || !postdata.difficulty){
        res.redirect('/programs/new?err=val');
    }else{
        request(
            requestOptions,
            function(err, response, body){
                if(response.statusCode === 201){
                    res.redirect('/');
                }else if(response.statusCode === 400 &&
                    body.name && body.name === "ValidationError"){
                    res.redirect('/programs/new?err=val');
                }else{
                    console.log(body);
                    _showError(req,res,response.statusCode);
                }
            }
        );
    }
};

