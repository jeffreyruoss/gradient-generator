import { deleteGradientInit } from '../SavedGradient/DeleteSavedGradient';
import { loadSavedGradientInit } from '../SavedGradient/LoadSavedGradient';
import { createSavedGradient } from '../SavedGradient/SavedGradient';
import { saveGradientNameInit } from '../SavedGradient/SavedGradientName';
import { savedGradientsContainer, addSavedGradientsHeading } from './SavedGradientsSection';


export function saveGradientHandler() {
	addSavedGradientToUI();
	saveSavedGradientsToLocalStorage();
}
function addSavedGradientToUI() {
	const savedGradientHTML = createSavedGradient();
	savedGradientsContainer.insertAdjacentHTML('beforeend', savedGradientHTML);
	const savedGradientElement = savedGradientsContainer.lastElementChild;
	saveGradientNameInit(savedGradientElement);
	loadSavedGradientInit(savedGradientElement);
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
