import { createTrashIcon } from './TrashIcon.js';

const trashIcon = createTrashIcon();

export function createMarker(position, color, index) {
	return `
    <div class="marker" style="left: ${position};" data-color-value="${color}" data-stop-index="${index + 1}">
			${trashIcon}
			<input type="text" data-coloris class="coloris-picker">
			<div class="color-swatch" id="color-swatch" style="background-color: ${color}"></div>
    </div>
  `;
}