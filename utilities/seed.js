require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Exercise = require('../models/exercise');

const exercises = [
  {
    name: "Barbell Bench Press",
    category: "Chest",
    description: "A compound exercise that targets the pectoral muscles, shoulders, and triceps using a barbell on a flat bench."
  },
  {
    name: "Pull-Up",
    category: "Back",
    description: "A bodyweight exercise that primarily targets the latissimus dorsi while also engaging the biceps and shoulders."
  },
  {
    name: "Squat",
    category: "Legs",
    description: "A compound lower-body exercise that strengthens the quadriceps, hamstrings, glutes, and core."
  },
  {
    name: "Shoulder Press",
    category: "Shoulders",
    description: "An overhead pressing movement that builds the deltoids and triceps."
  },
  {
    name: "Bicep Curl",
    category: "Biceps",
    description: "An isolation exercise that targets the biceps brachii using dumbbells, a barbell, or a cable machine."
  },
  {
    name: "Tricep Dips",
    category: "Triceps",
    description: "A bodyweight exercise that works the triceps, chest, and front shoulders."
  },
  {
    name: "Plank",
    category: "Abs",
    description: "A core-strengthening isometric exercise that targets the abdominals, lower back, and shoulders."
  },
  {
    name: "Running",
    category: "Cardio",
    description: "A cardiovascular exercise that improves endurance and strengthens the legs and heart."
  }
];



const seed = async () => {
    await mongoose.connect(process.env.MONGODB_URI);


    await Exercise.deleteMany({});

   const createdExercises = await Exercise.create(exercises)
   console.log(createdExercises);

    await mongoose.disconnect();
}

seed();