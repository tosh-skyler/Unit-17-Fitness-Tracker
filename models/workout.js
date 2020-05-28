const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	WorkoutSchema = new Schema({ day: { type: Date, default: Date.now() }, exercises: Array }),
	Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
