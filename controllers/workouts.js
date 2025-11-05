const express = require('express');
const verifyToken = require('../middleware/verify-token');
const Workout = require('../models/workout')
const router = express.Router();

router.use(verifyToken);


//POST /workouts
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

//GET /workouts
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




module.exports = router;