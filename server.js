const express = require('express'),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	path = require('path'),
  port = process.env.PORT || 5e3,
  

	app = express(),
	mongo_URI = require('./config/keys').mongoURI,
  db = require('./models');
  


  app.use(logger('dev')),
	app.use(express.static('public')),
	app.use(express.urlencoded({ extended: !0 })),
  app.use(express.json()),
  


	mongoose
		.connect('mongodb+srv://coffee:coffeeaddict@cluster0-3nocy.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: !0, useNewUrlParser: !0, useFindAndModify: !1 })
		.then(() => console.log('M O N G O D B   C O N N E C T E D . . .'))
    .catch((a) => console.log('[ E R R O R ]: ' + a)),
    
  
  
	app.get('/', (c, a) => {
		a.sendFile(path.join(__dirname + '/public/index.html'));
  }),
  
	app.get('/exercise', (c, a) => {
		a.sendFile(path.join(__dirname + '/public/exercise.html'));
  }),
  
	app.get('/stats', (c, a) => {
		a.sendFile(path.join(__dirname + '/public/stats.html'));
  }),
  
	app.get('/api/workouts', (c, d) => {
		db.Workout
			.find({})
			.then((b) => {
				d.json(b);
			})
			.catch((b) => {
				d.json(b);
			});
  }),
  
	app.post('/api/workouts', (c, d) => {
		db.Workout
			.create(new db.Workout(c.body))
			.then((b) => {
				d.send(b);
			})
			.catch((b) => {
				d.json(b);
			});
  }),
  
	app.put('/api/workouts/:id', (c, d) => {
		db.Workout
			.findByIdAndUpdate(c.params.id, { $push: { exercises: c.body } }, { new: !0 })
			.then((b) => {
				d.json(b);
			})
			.catch((b) => {
				d.json(b);
			});
  }),
  
	app.get('/api/workouts/range', (c, d) => {
		db.Workout.find({}).then((b) => {
			d.json(b);
		});
  }),
  
	app.listen(port, () => console.log(`S E R V E R   S T A R T E D   O N   P O R T ${port}`));