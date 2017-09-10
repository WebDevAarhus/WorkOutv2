var express = require('express');
var router = express.Router();
var ctrlPrograms = require('../controllers/programs');

/* GET home page. */
router.get('/', ctrlPrograms.programsList);
router.get('/program', ctrlPrograms.programInfo);
router.get('/new', ctrlPrograms.addProgram);
router.get('/program/exercise/new',ctrlPrograms.addExercise);
module.exports = router;
