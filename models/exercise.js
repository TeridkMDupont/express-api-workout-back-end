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
        }
    }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;