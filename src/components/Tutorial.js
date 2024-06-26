export function createTutorial() {
	if (localStorage.getItem('gradient_generator_tutorial_seen')) return '';
	return `
		<div class="tutorial-container">
			<div class="tutorial">
				<button class="close-x">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close-box-outline</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" /></svg>
				</button>
				<p>Click on the gradient bar to add a color stop</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="arrow bounce-animation"><title>arrow-down-bold</title><path d="M9,4H15V12H19.84L12,19.84L4.16,12H9V4Z" /></svg>
			</div>
		</div>
	`;
}

let tutorialContainer;

export function initTutorial() {
	if (localStorage.getItem('gradient_generator_tutorial_seen')) return '';

	tutorialContainer = document.querySelector('.tutorial-container');
	const closeButton = document.querySelector('.close-x');

	closeButton.addEventListener('click', () => {
		removeTutorial();
	});
}

export function removeTutorial() {
	if (tutorialContainer) {
		tutorialContainer.remove();
		localStorage.setItem('gradient_generator_tutorial_seen', 'true');
	}
}