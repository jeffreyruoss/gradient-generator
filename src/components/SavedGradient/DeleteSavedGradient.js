import { saveSavedGradientsToLocalStorage } from './../SavedGradientsSection.js';

export function createDeleteSavedGradientButton() {
	return `
		<button class="delete-saved-gradient">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
		</button>
	`
}

export function deleteGradientInit(savedGradientElement) {
	const deleteGradientButton = savedGradientElement.querySelector('.delete-saved-gradient');
	deleteGradientButton.addEventListener('click', deleteGradientHandler);
}

function deleteGradientHandler(event) {
	const savedGradientElement = event.target.closest('.saved-gradient');
	savedGradientElement.remove();
	saveSavedGradientsToLocalStorage();

	// if no saved gradients left, remove heading
	const savedGradients = document.querySelectorAll('.saved-gradient');
	if (savedGradients.length === 0) {
		const savedGradientsHeading = document.querySelector('.saved-gradients-heading');
		savedGradientsHeading.remove();
	}
}