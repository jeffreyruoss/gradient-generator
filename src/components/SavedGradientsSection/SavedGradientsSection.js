import { createSavedGradient } from '../SavedGradient/SavedGradient.js';
import { saveGradientNameInit } from '../SavedGradient/SavedGradientName.js';
import { deleteGradientInit } from '../SavedGradient/DeleteSavedGradient.js';
import { loadSavedGradientInit } from '../SavedGradient/LoadSavedGradient.js';
import { saveGradientHandler } from './save-gradient.js';
import { exportSavedGradientsHandler } from './export.js';
import { importSavedGradientsHandler } from './import.js';

export let savedGradientsContainer;

export function createSavedGradients() {
	return `
		<div class="container">
			<div class="saved-gradients-section">
				<div class="saved-gradients-buttons">
					<button class="save-gradient-button">SAVE</button>
					<button class="import-saved-gradients">IMPORT</button>
					<button class="export-saved-gradients hide">EXPORT</button>
				</div>
				<div class="saved-gradients-container"></div>
			</div>
		</div>
	`
}

export function addSavedGradientsHeading() {
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
	const importSavedGradientsButton = document.querySelector('.import-saved-gradients');
	importSavedGradientsButton.addEventListener('click', importSavedGradientsHandler);
	const exportSavedGradientsButton = document.querySelector('.export-saved-gradients');
	exportSavedGradientsButton.addEventListener('click', exportSavedGradientsHandler);
	loadSavedGradientsFromLocalStorage();

	const savedGradientsLocalStorage = localStorage.getItem('gradient_generator_saved_gradients');
	if (savedGradientsLocalStorage && savedGradientsLocalStorage !== '[]') {
		addSavedGradientsHeading();
	}

	toggleExportButtonVisibilty();
}

function loadSavedGradientsFromLocalStorage() {
	const savedGradientsArray = JSON.parse(localStorage.getItem('gradient_generator_saved_gradients'));
	if (savedGradientsArray) {
		savedGradientsArray.forEach(savedGradient => {
			const savedGradientHTML = createSavedGradient(savedGradient.stops, savedGradient.degrees, savedGradient.type);
			savedGradientsContainer.insertAdjacentHTML('beforeend', savedGradientHTML);
			const savedGradientElement = savedGradientsContainer.lastElementChild;
			savedGradientElement.querySelector('.gradient-name').value = savedGradient.name;
			savedGradientElement.dataset.savedGradientStops = JSON.stringify(savedGradient.stops);
			savedGradientElement.dataset.savedGradientDegrees = savedGradient.degrees;
			savedGradientElement.dataset.savedGradientType = savedGradient.type;

			saveGradientNameInit(savedGradientElement);
			loadSavedGradientInit(savedGradientElement);
			deleteGradientInit(savedGradientElement);
		});
	}
}

export function toggleExportButtonVisibilty() {
	const savedGradients = document.querySelectorAll('.saved-gradient');
	const exportSavedGradientsButton = document.querySelector('.export-saved-gradients');
	if (savedGradients.length) {
		exportSavedGradientsButton.classList.remove('hide');
	} else {
		exportSavedGradientsButton.classList.add('hide');
	}
}