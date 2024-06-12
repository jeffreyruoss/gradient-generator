import { init } from './init.js';
import { gradientStops } from './store.js';
import { getGradientRectangle, updateGradient } from './components/GradientContainer.js';

function handleMouseMove(e, marker, startX) {
	const gradientRectangle = getGradientRectangle();
	const newLeft = Math.min(Math.max(0, e.clientX - startX), gradientRectangle.offsetWidth);
	const newPosition = (newLeft / gradientRectangle.offsetWidth) * 100;
	const index = marker.dataset.stopIndex;
	gradientStops[index].position = newPosition;
	marker.style.left = `${newPosition}%`;
	updateGradient(gradientRectangle);
}

function handleMouseUp(onMouseMove) {
	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', handleMouseUp);
}

export function handleMouseDown(event, marker, startX) {
	const onMouseMove = (e) => handleMouseMove(e, marker, startX);
	const onMouseUp = () => handleMouseUp(onMouseMove);

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
}

document.addEventListener('DOMContentLoaded', () => init());
