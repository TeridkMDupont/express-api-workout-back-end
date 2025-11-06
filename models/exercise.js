const mongoose = require("mongoose");


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
            enum: ['Back', 'Chest', 'Biceps', 'Triceps', 'Legs', 'Shoulders', 'Abs', 'Cardio'],
        },
        description: {
            type: String
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true}
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;