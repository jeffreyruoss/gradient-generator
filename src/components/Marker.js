import { createTrashIcon } from './TrashIcon.js';
import { createPencilIcon } from './PencilIcon.js';

export function createMarker(position, color, index) {
	return `
    <div class="marker" style="left: ${position};" data-color-value="${color}" data-stop-index="${index + 1}">
			${createTrashIcon()}
			<input type="text" data-coloris class="coloris-picker">
			<div class="color-swatch" id="color-swatch" style="background-color: ${color}">
				${createPencilIcon()}
			</div>
    </div>
  `;
}