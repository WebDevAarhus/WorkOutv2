var express = require('express');
var router = express.Router();
var ctrlPrograms = require('../controllers/programs');
var ctrlExercises = require('../controllers/exercises');

/* GET home page. */
router.get('/', ctrlPrograms.programsList);
router.post('/programadded', ctrlPrograms.createProgram);
router.get('/programs/new', ctrlPrograms.addProgramForm);
router.get('/programs/:programid', ctrlPrograms.programInfo);

//exercises
router.post('/exerciseadded', ctrlExercises.createExercise);
router.get('/programs/:programid/exercises/new',ctrlExercises.addExerciseForm);
router.post('/programs/:programid/exercises/new',ctrlExercises.createExercise);

module.exports = router;
