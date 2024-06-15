import { gradientStops } from '../../lib/gradient-stops.js';
import { createSavedGradientName } from './SavedGradientName.js';
import { createSavedGradientThumb } from './SavedGradientThumb.js';
import { createLoadSavedGradientButton } from './LoadSavedGradient.js';
import { createDeleteSavedGradientButton } from './DeleteSavedGradient.js';

export function createSavedGradient() {
	return `
		<div class="saved-gradient" data-saved-gradient-stops="${savedGradientStopsDataString()}">
			<div class="saved-gradient-row-1">
				${createSavedGradientName()}
			</div>
			<div class="saved-gradient-row-2">
				${createSavedGradientThumb()}
				<div class="save-gradient-buttons">
					${createLoadSavedGradientButton()}
					${createDeleteSavedGradientButton()}
				</div>
			</div>
		</div>
	`
}

function savedGradientStopsDataString() {
	const gradientStopsString = JSON.stringify(gradientStops);
	// replace all double quotes with single quotes
	const gradientStopsStringSingleQuotes = gradientStopsString.replace(/"/g, "'");
	// console.log('gradientStopsStringSingleQuotes:', gradientStopsStringSingleQuotes);
	return gradientStopsStringSingleQuotes;
}