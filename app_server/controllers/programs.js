/*GET programs page*/
module.exports.programsList = function(req,res){
    res.render('programs-list', {
        title:'programs list',
        sidebar: 'hello and welcome to programs list page!',
        pageHeader:{
            strapline: "some strapline"
        },

        programs:[
            {
                name:'Program1',
                author: 'MR',
                difficulty:5
            },
            {
                name:'Program2',
                author: 'HH',
                difficulty:4
            }
        ]      
    })
};

/*GET program info page*/
module.exports.programInfo = function(req,res){
    res.render('program-info', {
        title:'Program info',
        pageHeader:{
            title:'Program 1',
            author:'MR'
        },
        program:{
            name: 'Program1',
            difficulty: 5,
            exercises:[
                {
                    name:'Squat',
                    reps:20,
                    description:'Bend knees and on da floor'

                }
            ]

        }
    })
};

/*GET add program page*/
module.exports.addProgram = function(req,res){
    res.render('program-form', {
        title:'add program',
        pageHeader:{
            title:'Add a program'
        },

    })
};

/*GET add exercise page*/
module.exports.addExercise = function(req,res){
    res.render('program-exercise-form', {
        title:'Add exercise',
        pageHeader:{
            title:'Program 1 exercise'
        }
        
    })
};
