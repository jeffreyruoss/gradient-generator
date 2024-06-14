import { gradientStops } from '../lib/gradient-stops.js';
import { createGradientString } from './GradientContainer.js';

export function createSavedGradient() {
	return `
		<div class="saved-gradient" data-saved-gradient-stops="${JSON.stringify(gradientStops)}">
			<div class="saved-gradient-name">
				<button class="edit-saved-gradient-name">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
				</button>
				<label>Name: </label>
				<input type="text" class="gradient-name" value="My gradient">
			</div>
			<div>
				<div class="saved-gradient-thumb" style="${savedGradientThumbBackground()}"></div>
				<div class="save-gradient-buttons">
					<button class="load-saved-gradient">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"/></svg>
					</button>
					<button class="delete-saved-gradient">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
					</button>
				</div>
			</div>
		</div>
	`
}

function savedGradientThumbBackground() {
	const gradientString = createGradientString(gradientStops);
	return `background: linear-gradient(to right, ${gradientString})`;
}