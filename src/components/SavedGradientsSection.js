import { createSavedGradient } from './SavedGradient/SavedGradient.js';
import { saveGradientNameInit } from './SavedGradient/SavedGradientName.js';;

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
}

function saveGradientHandler() {
	addSavedGradientToUI();
	saveSavedGradientsToLocalStorage();
}

function addSavedGradientToUI() {
	const savedGradientElement = document.createElement('div');
	savedGradientElement.innerHTML = createSavedGradient();

	saveGradientNameInit(savedGradientElement);

	savedGradientsContainer.appendChild(savedGradientElement);
}

function saveSavedGradientsToLocalStorage() {
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
