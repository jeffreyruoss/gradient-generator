export function createGradientContainer(markerHTML) {
  return `
    <div class="container">
      <div id="gradient-container">
        <div id="gradient-rectangle">
          ${markerHTML}
        </div>
      </div>
    </div>
  `;
}