const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema (
    {
        text: {
            type: String, 
            required: true
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
    { timestamps: true }
);

const workoutSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
          author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
          comment: [commentSchema],
    },
    { timestamps: true }
);



const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;