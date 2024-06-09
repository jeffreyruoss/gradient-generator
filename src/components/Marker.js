export function createMarker(position, color) {
	return `
    <div class="marker" style="left: ${position};">
      <input type="color" value="${color}" class="color-picker">
    </div>
  `;
}