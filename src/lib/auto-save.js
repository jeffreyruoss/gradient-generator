import { gradientStops } from './gradient-stops';
import { gradientDegrees, gradientType } from '../components/GradientTypeSelector';

export function autoSave() {
	if (typeof (Storage) !== "undefined") {
		const currentGradient = {
			type: gradientType,
			stops: gradientStops,
			degrees: gradientDegrees
		};
		localStorage.setItem('gradient_generator_current_gradient', JSON.stringify(currentGradient));
	} else {
		console.log("No Web Storage support");
	}
}