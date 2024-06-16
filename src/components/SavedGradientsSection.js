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
				<h2>Saved Gradients</h2>
				<div class="saved-gradients-container"></div>
			</div>
		</div>
	`
}

export function saveGradientsInit() {
	savedGradientsContainer = document.querySelector('.saved-gradients-container');
	const saveGradientButton = document.querySelector('.save-gradient-button');
	saveGradientButton.addEventListener('click', saveGradientHandler);
	loadSavedGradientsFromLocalStorage();
}

function saveGradientHandler() {
	addSavedGradientToUI();
	saveSavedGradientsToLocalStorage();
}

function addSavedGradientToUI() {
	const savedGradientElement = document.createElement('div');
	savedGradientElement.innerHTML = createSavedGradient();

	saveGradientNameInit(savedGradientElement);
	deleteGradientInit(savedGradientElement);

	savedGradientsContainer.appendChild(savedGradientElement);
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
			const savedGradientElement = document.createElement('div');
			savedGradientElement.innerHTML = createSavedGradient(savedGradient.stops);
			savedGradientsContainer.appendChild(savedGradientElement);
			savedGradientElement.querySelector('.gradient-name').value = savedGradient.name;
			savedGradientElement.dataset.savedGradientStops = JSON.stringify(savedGradient.stops);
			saveGradientNameInit(savedGradientElement);
			deleteGradientInit(savedGradientElement);
		});
	}
}