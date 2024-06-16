import { getGradientRectangle } from "../GradientContainer";
import { autoSave } from "../../lib/auto-save";
import { gradientStops } from "../../lib/gradient-stops";
import { updateGradient } from "../GradientContainer";
import { updatePercentInputValue } from "./PercentInput";

function handleMouseMove(e, marker, startX) {
	const position = Math.max(0, Math.min(100, ((e.clientX - startX) / marker.parentElement.offsetWidth) * 100));
	updateMarkerMove(marker, position);
}

function updateMarkerMove(marker, position) {
	const gradientRectangle = getGradientRectangle();
	const index = marker.dataset.stopIndex;
	gradientStops[index].position = position;
	marker.style.left = `${position}%`;
	updateGradient(gradientRectangle);
	updatePercentInputValue(marker, position);
}

function handleMouseUp(onMouseMove) {
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
	autoSave();
}

export function handleMouseDown(event, marker, startX) {
	const onMouseMove = (e) => handleMouseMove(e, marker, startX);
	const onMouseUp = () => handleMouseUp(onMouseMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}