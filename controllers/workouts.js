const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Workout = require('../models/workout');
const Exercise = require('../models/exercise');
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

//GET /workouts/:workoutId - Show
router.get('/:workoutId', async (req, res) => {
    try { 
        const workout = await Workout.findById(req.params.workoutId).populate([
            'author',
            'comments.author',
        ]);
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

//POST /workouts/:workoutId/comments - Post a Comment
router.post('/:workoutId/comments', async ( req, res) => {
    try {
        req.body.author = req.user._id;
        const workout = await Workout.findById(req.params.workoutId);
        workout.comments.push(req.body);
        await workout.save();
        const newComment = workout.comments[workout.comments.length - 1];
        newComment._doc.author = req.user
        res.status(200).json(newComment);
    }catch (err) {
        res.status(500).json({err: err.message});
    }
});

//PUT /workouts/:workoutId/comments/:commentsId - Update a comment
router.put('/:workoutId/comments/:commentId', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.workoutId);
        const comment = workout.comments.id(req.params.commentId);

        if (comment.author.toString() !== req.user._id) {
            return res.status(403).json({message: "You are not authorized to edit this comment"})
        }
        comment.text = req.body.text;
        await workout.save();
        res.status(200).json({ message: "Comment updated succesfully!"})
    }catch (err) {
        res.status(500).json({err: err.message})
    }
});


//POST /workouts/exercises - Crceate an Exercise 
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


module.exports = router;