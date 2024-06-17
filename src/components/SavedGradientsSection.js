import { createSavedGradient } from './SavedGradient/SavedGradient.js';
import { saveGradientNameInit } from './SavedGradient/SavedGradientName.js';
import { deleteGradientInit } from './SavedGradient/DeleteSavedGradient.js';

let savedGradientsContainer;

export function createSavedGradients() {
	return `
		<div class="container">
			<div class="saved-gradients-section">
				<button class="save-gradient-button">SAVE</button>
				<button class="import-saved-gradients">IMPORT</button>
				<button class="export-saved-gradients">EXPORT</button>
				<div class="saved-gradients-container"></div>
			</div>
		</div>
	`
}

function addSavedGradientsHeading() {
	if (document.querySelector('.saved-gradients-heading')) return;
	const savedGradientsHeading = document.createElement('h2');
	savedGradientsHeading.textContent = 'Saved Gradients';
	savedGradientsHeading.classList.add('saved-gradients-heading');
	savedGradientsContainer.insertAdjacentElement('beforebegin', savedGradientsHeading);
}

export function saveGradientsInit() {
	savedGradientsContainer = document.querySelector('.saved-gradients-container');
	const saveGradientButton = document.querySelector('.save-gradient-button');
	saveGradientButton.addEventListener('click', saveGradientHandler);
	loadSavedGradientsFromLocalStorage();

	const savedGradientsLocalStorage = localStorage.getItem('gradient_generator_saved_gradients');
	if (savedGradientsLocalStorage && savedGradientsLocalStorage !== '[]') {
		addSavedGradientsHeading();
	}
}

function saveGradientHandler() {
	addSavedGradientToUI();
	saveSavedGradientsToLocalStorage();
}

function addSavedGradientToUI() {
	const savedGradientHTML = createSavedGradient();
	savedGradientsContainer.insertAdjacentHTML('beforeend', savedGradientHTML);
	const savedGradientElement = savedGradientsContainer.lastElementChild;
	saveGradientNameInit(savedGradientElement);
	deleteGradientInit(savedGradientElement);
	addSavedGradientsHeading();
}

export function saveSavedGradientsToLocalStorage() {
	const savedGradients = document.querySelectorAll('.saved-gradient');
	const savedGradientsArray = [];

	savedGradients.forEach(savedGradient => {
		const gradientName = savedGradient.querySelector('.gradient-name').value;
		const gradientStopsString = savedGradient.dataset.savedGradientStops;
		const gradientStopsStringDoubleQuotes = gradientStopsString.replace(/'/g, '"');
		const gradientStops = JSON.parse(gradientStopsStringDoubleQuotes);
		savedGradientsArray.push({ name: gradientName, stops: gradientStops });
	});

	localStorage.setItem('gradient_generator_saved_gradients', JSON.stringify(savedGradientsArray));
}

function loadSavedGradientsFromLocalStorage() {
	const savedGradientsArray = JSON.parse(localStorage.getItem('gradient_generator_saved_gradients'));
	if (savedGradientsArray) {
		savedGradientsArray.forEach(savedGradient => {
			const savedGradientHTML = createSavedGradient(savedGradient.stops);
			savedGradientsContainer.insertAdjacentHTML('beforeend', savedGradientHTML);
			const savedGradientElement = savedGradientsContainer.lastElementChild;
			savedGradientElement.querySelector('.gradient-name').value = savedGradient.name;
			savedGradientElement.dataset.savedGradientStops = JSON.stringify(savedGradient.stops);
			saveGradientNameInit(savedGradientElement);
			deleteGradientInit(savedGradientElement);
		});
	}
}