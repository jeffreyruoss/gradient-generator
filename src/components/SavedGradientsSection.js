import { createSavedGradient } from './SavedGradient.js';

let savedGradientsContainer;

export function createSavedGradients() {
	return `
		<div class="container">
			<div class="saved-gradients-section">
				<button class="save-gradient">SAVE</button>
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
	const saveGradientButton = document.querySelector('.save-gradient');
	saveGradientButton.addEventListener('click', addSavedGradient);
}

function addSavedGradient() {
	const savedGradient = createSavedGradient();
	savedGradientsContainer.innerHTML += savedGradient;
}