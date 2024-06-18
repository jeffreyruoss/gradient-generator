import { gradientStops } from '../lib/gradient-stops.js';
import { createMarkers } from './Marker/Marker.js';

export function createGradientContainer() {
  return `
    <div class="container">
      <div id="gradient-container">
        <div id="gradient-rectangle">
          ${createMarkers()}
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