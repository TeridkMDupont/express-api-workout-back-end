const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Exercise = require('../models/exercise');
const router = express.Router();

router.use(verifyToken);

//POST /exercises - Crceate an Exercise 
router.post('/exercises', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const exercise = await Exercise.create(req.body)
        exercise._doc.author = req.user;
        res.status(201).json(exercise)
    }catch (err) {
        res.status(500).json({ err: err.message})
    }
});


//GET /exercises - Get all Exercises
router.get('/exercises', async (req, res) => {
    try {
     const exercises = await Exercise.find({})
        .populate('author')
        .sort({createdAt: 'desc'});
        res.status(200).json(exercises)
    }catch (err) {
        res.status(500).json({err: err.message})
    }
});

//GET /exercises/:exerciseId - Get one Exercise
router.get('/:workoutId', async (req, res) => {
    try { 
        const exercise = await Exercise.findById(req.params.workoutId).populate([
            'author'
        ]);
        res.status(200).json(exercise)
    }catch (err) {
        res.status(500).json({err: err.message})
    }
});


//PUT /exercises/:exerciseId -Update an Exercise
router.put('/:exerciseId', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId);
        if (!exercise.author.equals(req.user._id)) {
            return res.status(403).send("You can only update your own Exercises!")
        };
        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.exerciseId,
            req.body,
            { new: true }
        );
        updatedExercise._doc.author = req.user;
        res.status(200).json(updatedExercise);
    }catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//DELETE /exercises/:exerciseId - Delete an Exercise
router.delete('/:exerciseId', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.exerciseId);
        if(!exercise.author.equals(req.user._id)) {
            return res.status(403).send("You can only delete your own Exercises!");
        }
        const deletedExercise = await Exercise.findByIdAndDelete(req.params.exerciseId)
        res.status(200).json(deletedExercise);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
});

module.exports = router;