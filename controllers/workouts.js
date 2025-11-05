const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Workout = require('../models/workout')
const router = express.Router();

router.use(verifyToken);


//POST /workouts -Create
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id;
        const workout = await Workout.create(req.body);
        workout._doc.author = req.user;
        res.status(201).json(workout);
    }catch (err) {
        res.status(500).json({err: err.message});
    }
});

//GET /workouts -Index
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find({})
        .populate('author')
        .sort({createdAt: 'desc'});
        res.status(200).json(workouts)
    }catch (err) {
        res.status(500).json({err: err.message})
    }
});

//GET /workouts/:workoutId -Show
router.get('/:workoutId', async (req, res) => {
    try { 
        const workout = await Workout.findById(req.params.workoutId).populate('author');
        res.status(200).json(workout)
    }catch (err) {
        res.status(500).json({err: err.message})
    }
});

//PUT /workouts/:workoutId -Update
router.put('/:workoutId', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        if (!workout.author.equals(req.user._id)) {
            return res.status(403).send("You can only update your own Workouts!")
        };
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.workoutId,
            req.body,
            { new: true }
        );
        updatedWorkout._doc.author = req.user;
        res.status(200).json(updatedWorkout);
    }catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//DELETE /workouts/:workoutId - Delete
router.delete('/:workoutId', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        if(!workout.author.equals(req.user._id)) {
            return res.status(403).send("You can only delete your own Workouts!");
        }
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.workoutId)
        res.status(200).json(deletedWorkout);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
});



module.exports = router;