import { gradientStops } from './gradient-stops';

export function autoSave() {
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem('gradient_generator_current_gradient', JSON.stringify(gradientStops));
	} else {
		console.log("No Web Storage support");
	}
}