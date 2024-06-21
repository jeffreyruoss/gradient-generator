import { gradientStops } from './gradient-stops';
import { gradientDegrees } from '../components/GradientTypeSelector';

export function autoSave() {
	if (typeof (Storage) !== "undefined") {
		const currentGradient = {
			stops: gradientStops,
			degrees: gradientDegrees
		};
		localStorage.setItem('gradient_generator_current_gradient', JSON.stringify(currentGradient));
	} else {
		console.log("No Web Storage support");
	}
}