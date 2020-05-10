const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    excercises: [
      {
        type: { type: String, required: true },
        name: { type: String, required: true },
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
