const workoutTypeSelect = document.querySelector('#type'),
	cardioForm = document.querySelector('.cardio-form'),
	resistanceForm = document.querySelector('.resistance-form'),
	cardioNameInput = document.querySelector('#cardio-name'),
	nameInput = document.querySelector('#name'),
	weightInput = document.querySelector('#weight'),
	setsInput = document.querySelector('#sets'),
	repsInput = document.querySelector('#reps'),
	durationInput = document.querySelector('#duration'),
	resistanceDurationInput = document.querySelector('#resistance-duration'),
	distanceInput = document.querySelector('#distance'),
	completeButton = document.querySelector('button.complete'),
	addButton = document.querySelector('button.add-another'),
	toast = document.querySelector('#toast'),
	newWorkout = document.querySelector('.new-workout');
let workoutType = null,
	shouldNavigateAway = !1;
async function initExercise() {
	let a;
	location.search.split('=')[1] === void 0 && ((a = await API.createWorkout()), console.log(a)),
		a && (location.search = '?id=' + a._id);
}
initExercise();
function handleWorkoutTypeChange(a) {
	(workoutType = a.target.value),
		'cardio' === workoutType
			? (cardioForm.classList.remove('d-none'), resistanceForm.classList.add('d-none'))
			: 'resistance' === workoutType
				? (resistanceForm.classList.remove('d-none'), cardioForm.classList.add('d-none'))
				: (cardioForm.classList.add('d-none'), resistanceForm.classList.add('d-none')),
		validateInputs();
}
function validateInputs() {
	let a = !0;
	'resistance' === workoutType
		? ('' === nameInput.value.trim() && (a = !1),
			'' === weightInput.value.trim() && (a = !1),
			'' === setsInput.value.trim() && (a = !1),
			'' === repsInput.value.trim() && (a = !1),
			'' === resistanceDurationInput.value.trim() && (a = !1))
		: 'cardio' === workoutType &&
			('' === cardioNameInput.value.trim() && (a = !1),
			'' === durationInput.value.trim() && (a = !1),
			'' === distanceInput.value.trim() && (a = !1)),
		a
			? (completeButton.removeAttribute('disabled'), addButton.removeAttribute('disabled'))
			: (completeButton.setAttribute('disabled', !0), addButton.setAttribute('disabled', !0));
}
async function handleFormSubmit(a) {
	a.preventDefault();
	let b = {};
	'cardio' === workoutType
		? ((b.type = 'cardio'),
			(b.name = cardioNameInput.value.trim()),
			(b.distance = +distanceInput.value.trim()),
			(b.duration = +durationInput.value.trim()))
		: 'resistance' === workoutType &&
			((b.type = 'resistance'),
			(b.name = nameInput.value.trim()),
			(b.weight = +weightInput.value.trim()),
			(b.sets = +setsInput.value.trim()),
			(b.reps = +repsInput.value.trim()),
			(b.duration = +resistanceDurationInput.value.trim())),
		await API.addExercise(b),
		clearInputs(),
		toast.classList.add('success');
}
function handleToastAnimationEnd() {
	toast.removeAttribute('class'), shouldNavigateAway && (location.href = '/');
}
function clearInputs() {
	(cardioNameInput.value = ''),
		(nameInput.value = ''),
		(setsInput.value = ''),
		(distanceInput.value = ''),
		(durationInput.value = ''),
		(repsInput.value = ''),
		(resistanceDurationInput.value = ''),
		(weightInput.value = '');
}
workoutTypeSelect && workoutTypeSelect.addEventListener('change', handleWorkoutTypeChange),
	completeButton &&
		completeButton.addEventListener('click', function(a) {
			(shouldNavigateAway = !0), handleFormSubmit(a);
		}),
	addButton && addButton.addEventListener('click', handleFormSubmit),
	toast.addEventListener('animationend', handleToastAnimationEnd),
	document.querySelectorAll('input').forEach((a) => a.addEventListener('input', validateInputs));
