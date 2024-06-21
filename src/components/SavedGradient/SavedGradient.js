import { gradientStops } from '../../lib/gradient-stops.js';
import { createSavedGradientName } from './SavedGradientName.js';
import { createSavedGradientThumb } from './SavedGradientThumb.js';
import { createLoadSavedGradientButton } from './LoadSavedGradient.js';
import { createDeleteSavedGradientButton } from './DeleteSavedGradient.js';

export function createSavedGradient(savedGradientStops, savedGradientDegrees) {
	return `
        <div class="saved-gradient" data-saved-gradient-stops="${savedGradientStopsDataString(savedGradientStops)}" data-saved-gradient-degrees="${savedGradientDegrees}">
            <div class="saved-gradient-row-1">
                ${createSavedGradientName()}
            </div>
            <div class="saved-gradient-row-2">
                ${createSavedGradientThumb(savedGradientStops)}
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
	const gradientStopsStringSingleQuotes = gradientStopsString.replace(/"/g, "'");
	return gradientStopsStringSingleQuotes;
}