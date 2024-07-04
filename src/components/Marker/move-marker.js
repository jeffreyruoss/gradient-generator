import { getGradientRectangle } from "../GradientContainer";
import { autoSave } from "../../lib/auto-save";
import { gradientStops } from "../../lib/gradient-stops";
import { updateGradient } from "../GradientContainer";
import { updatePercentInputValue } from "./PercentInput";
import { reorderMarkers } from "./reorder-markers";

function handleMouseMove(e, marker) {
	const gradientRectangle = getGradientRectangle();
	const position = Math.max(0, Math.min(100, ((e.clientX - gradientRectangle.getBoundingClientRect().left) / gradientRectangle.offsetWidth) * 100));
	updateMarkerMove(marker, position);
	reorderMarkers();
	updateGradient(gradientRectangle);
}

function handleTouchMove(e, marker) {
	const gradientRectangle = getGradientRectangle();
	const touch = e.touches[0];
	const position = Math.max(0, Math.min(100, ((touch.clientX - gradientRectangle.getBoundingClientRect().left) / gradientRectangle.offsetWidth) * 100));
	updateMarkerMove(marker, position);
	reorderMarkers();
	updateGradient(gradientRectangle);
}

export function updateMarkerMove(marker, position) {
	const index = marker.dataset.stopIndex;
	gradientStops[index].position = position;
	marker.style.left = `${position}%`;
	updatePercentInputValue(marker, position);
}

function handleMouseUp(onMouseMove, onTouchMove) {
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
	document.removeEventListener('touchmove', onTouchMove);
	document.removeEventListener('touchend', handleMouseUp);
	autoSave();
}

export function handleMouseDown(event, marker, startX) {
	if (event.target.classList.contains('percent-input')) {
		return; // If it's a percentInput, don't initiate marker movement
	}

	document.activeElement.blur(); // Ensure any active inputs are blurred

	const onMouseMove = (e) => handleMouseMove(e, marker, startX);
	const onTouchMove = (e) => handleTouchMove(e, marker, startX);
	const onMouseUp = () => handleMouseUp(onMouseMove, onTouchMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('touchmove', onTouchMove);
	document.addEventListener('touchend', onMouseUp);
}