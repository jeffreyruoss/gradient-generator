export function createMarker(position, color) {
	return `
    <div class="marker" style="left: ${position};">
			<div class="color-value" data-color-value="${color}"></div>
			<input type="text" data-coloris class="coloris-picker">
			<div class="color-swatch" id="color-swatch" style="background-color: ${color}"></div>
    </div>
  `;
}