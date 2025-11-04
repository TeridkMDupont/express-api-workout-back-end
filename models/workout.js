const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true
        },
    }
);

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

const exerciseSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String, 
            required: true, 
            enum: ['Back', 'Chest', 'Biceps', 'Triceps', 'Legs', 'Shoulders', 'Abs'],
        },
        description: {
            type: String
        }
    }
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;