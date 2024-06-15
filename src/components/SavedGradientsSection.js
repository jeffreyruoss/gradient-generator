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
	saveGradientButton.addEventListener('click', addSavedGradient);
}

function addSavedGradient() {
	const savedGradientElement = document.createElement('div');
	savedGradientElement.innerHTML = createSavedGradient();

	saveGradientNameInit(savedGradientElement);

	savedGradientsContainer.appendChild(savedGradientElement);
}