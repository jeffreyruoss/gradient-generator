export function createGradientContainer(markerHTML) {
	return `
    <div id="gradient-container">
      <div id="gradient-rectangle">
        ${markerHTML}
      </div>
    </div>
  `;
}