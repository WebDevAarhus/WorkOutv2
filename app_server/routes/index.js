var express = require('express');
var router = express.Router();
var ctrlPrograms = require('../controllers/programs');
var ctrlExercises = require('../controllers/exercises');
var ctrlOther = require('../controllers/other');

//programs
router.get('/', ctrlPrograms.programsList);
router.get('/programs/new', ctrlPrograms.addProgramForm);
router.post('/programs/new', ctrlPrograms.createProgram);
router.get('/programs/:programid', ctrlPrograms.programInfo);

//exercises
router.get('/programs/:programid/exercises/new',ctrlExercises.addExerciseForm);
router.post('/programs/:programid/exercises/new',ctrlExercises.createExercise);

//other
router.get('/about', ctrlOther.about);

module.exports = router;
