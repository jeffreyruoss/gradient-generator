import { updateMarkerIndices } from './Marker/Marker.js';
import { updateGradientStops } from '../lib/gradient-stops.js';
import { updateGradient } from './GradientContainer.js';

export function createTrashIcon() {
	return `
		<div class="trash" id="trash">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>
		</div>
	`;
}

export function initTrashButtons() {
	const trashButtons = document.querySelectorAll('.trash');
	trashButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleTrashButtonClick(button.parentElement);
		});
		button.addEventListener('touchstart', () => {
			handleTrashButtonClick(button.parentElement);
		});
	});
}

function handleTrashButtonClick(marker) {
	marker.remove();
	updateMarkerIndices();
	updateGradientStops();
	updateGradient();
}