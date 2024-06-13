import { gradientStops } from '../lib/gradient-stops.js';

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

let gradientRectangle;

export function initGradientRectangle() {
  gradientRectangle = document.getElementById('gradient-rectangle');
}

export function getGradientRectangle() {
  return gradientRectangle;
}

export function createGradientString(stops) {
  return stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
}

export function updateGradient() {
  const gradientString = createGradientString(gradientStops);
  gradientRectangle.style.background = `linear-gradient(to right, ${gradientString})`;
  updateWrapBgGradient(gradientString);
}

function updateWrapBgGradient(gradientString) {
  const wrap = document.querySelector('.wrap');
  wrap.style.background = `linear-gradient(to right, ${gradientString})`;

}