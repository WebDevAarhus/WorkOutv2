var express = require('express');
var router = express.Router();
var ctrlPrograms = require('../controllers/programs');
var ctrlExercises = require('../controllers/exercises');
//TODOvar ctrlOther = require('../controllers/other');

//programs
router.get('/', ctrlPrograms.programsList); 
router.post('/programs', ctrlPrograms.createProgram);
router.get('/programs/:programid', ctrlPrograms.programInfo);
router.put('/programs/:programid', ctrlPrograms.updateProgram);
//router.delete('/programs/:programid', ctrlPrograms.deleteProgram);


//exercises
router.get('/programs/:programid/exercises/:exerciseid', ctrlExercises.exerciseInfo);
router.post('/programs/:programid/exercises',ctrlExercises.createExercise);

//other
//TODOrouter.get('/about', ctrlOther.about);

/*
router.get('/locations/:locationid/reviews/:reviewid',ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid',ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid',ctrlReviews.reviewsDeleteOne);
*/
module.exports = router;