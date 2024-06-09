export function createMarker(position, color) {
	return `
    <div class="marker" style="left: ${position};">
			<div class="color-value" data-color-value="${color}">${color}</div>
			<input type="text" data-coloris class="coloris-picker">
    </div>
  `;
}