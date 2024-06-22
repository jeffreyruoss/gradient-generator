import { gradientStops } from '../../lib/gradient-stops';
import { gradientDegrees, gradientType } from '../GradientTypeSelector';
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
	const savedGradientHTML = createSavedGradient(gradientStops, gradientDegrees, gradientType);
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
		const gradientType = savedGradient.dataset.savedGradientType;
		const gradientDegrees = savedGradient.dataset.savedGradientDegrees;

		const gradientStopsStringDoubleQuotes = gradientStopsString.replace(/'/g, '"');
		const gradientStops = JSON.parse(gradientStopsStringDoubleQuotes);

		if (gradientType !== 'radial') {
			savedGradientsArray.push({ name: gradientName, type: gradientType, stops: gradientStops, degrees: gradientDegrees });
		} else {
			savedGradientsArray.push({ name: gradientName, type: gradientType, stops: gradientStops });
		}
	});

	localStorage.setItem('gradient_generator_saved_gradients', JSON.stringify(savedGradientsArray));
}