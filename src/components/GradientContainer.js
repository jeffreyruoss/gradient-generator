import { gradientStops } from '../lib/gradient-stops.js';
import { createGradientTypeSelector, gradientDegrees, gradientType } from './GradientTypeSelector.js';
import { createMarkers } from './Marker/Marker.js';

export function createGradientContainer() {
  return `
    <div class="container">
      ${createGradientTypeSelector()}
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
  if (gradientType === 'linear') {
    gradientRectangle.style.background = `${gradientType}-gradient(to right, ${gradientString})`;
  } else if (gradientType === 'radial') {
    gradientRectangle.style.background = `${gradientType}-gradient(circle, ${gradientString})`;
  }

  updateWrapBgGradient(gradientString);
}

function updateWrapBgGradient(gradientString) {
  const wrap = document.querySelector('.wrap');
  if (gradientType === 'linear') {
    wrap.style.background = `${gradientType}-gradient(${gradientDegrees}deg, ${gradientString})`;
  } else if (gradientType === 'radial') {
    wrap.style.background = `${gradientType}-gradient(circle, ${gradientString})`;
  }
}