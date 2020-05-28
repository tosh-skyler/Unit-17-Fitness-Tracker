fetch('/api/workouts/range').then((a) => a.json()).then((a) => {
	populateChart(a);
}),
	API.getWorkoutsInRange();
function generatePalette() {
	return [
		'#003f5c',
		'#2f4b7c',
		'#665191',
		'#a05195',
		'#d45087',
		'#f95d6a',
		'#ff7c43',
		'ffa600',
		'#003f5c',
		'#2f4b7c',
		'#665191',
		'#a05195',
		'#d45087',
		'#f95d6a',
		'#ff7c43',
		'ffa600'
	];
}
function populateChart(a) {
	let b = duration(a),
		c = calculateTotalWeight(a),
		d = workoutNames(a);
	const e = generatePalette();
	let f = document.querySelector('#canvas').getContext('2d'),
		g = document.querySelector('#canvas2').getContext('2d'),
		h = document.querySelector('#canvas3').getContext('2d'),
		i = document.querySelector('#canvas4').getContext('2d'),
		j = new Chart(f, {
			type: 'line',
			data: {
				labels: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
				datasets: [
					{
						label: 'Workout Duration In Minutes',
						backgroundColor: 'red',
						borderColor: 'red',
						data: b,
						fill: !1
					}
				]
			},
			options: {
				responsive: !0,
				title: { display: !0 },
				scales: {
					xAxes: [ { display: !0, scaleLabel: { display: !0 } } ],
					yAxes: [ { display: !0, scaleLabel: { display: !0 } } ]
				}
			}
		}),
		k = new Chart(g, {
			type: 'bar',
			data: {
				labels: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
				datasets: [
					{
						label: 'Pounds',
						data: c,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}
				]
			},
			options: {
				title: { display: !0, text: 'Pounds Lifted' },
				scales: { yAxes: [ { ticks: { beginAtZero: !0 } } ] }
			}
		}),
		l = new Chart(h, {
			type: 'pie',
			data: { labels: d, datasets: [ { label: 'Excercises Performed', backgroundColor: e, data: b } ] },
			options: { title: { display: !0, text: 'Excercises Performed' } }
		}),
		m = new Chart(i, {
			type: 'doughnut',
			data: { labels: d, datasets: [ { label: 'Excercises Performed', backgroundColor: e, data: c } ] },
			options: { title: { display: !0, text: 'Excercises Performed' } }
		});
}
function duration(a) {
	let b = [];
	return (
		a.forEach((a) => {
			a.exercises.forEach((a) => {
				b.push(a.duration);
			});
		}),
		b
	);
}
function calculateTotalWeight(a) {
	let b = [];
	return (
		a.forEach((a) => {
			a.exercises.forEach((a) => {
				b.push(a.weight);
			});
		}),
		b
	);
}
function workoutNames(a) {
	let b = [];
	return (
		a.forEach((a) => {
			a.exercises.forEach((a) => {
				b.push(a.name);
			});
		}),
		b
	);
}
