const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (err, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (err, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findOneAndUpdate(
    { id: params.id },
    { $push: { excercises: body } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
