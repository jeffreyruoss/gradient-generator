import { gradientStops } from '../lib/gradient-stops.js';
import { updateCodeBox } from './CodeBox.js';
import { createGradientTypeSelector, gradientDegrees, gradientType } from './GradientTypeSelector.js';
import { createMarkers } from './Marker/Marker.js';
import { createTutorial } from './Tutorial.js';

export function createGradientContainer() {
  return `
    <div class="container">
      ${createGradientTypeSelector()}
      <div id="gradient-container">
        <div id="gradient-preview"></div>
        ${createTutorial()}
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
  return stops.map(stop => `${stop.color} ${Math.round(stop.position)}%`).join(', ');
}

export function updateGradient() {
  const gradientString = createGradientString(gradientStops);
  if (gradientType === 'linear') {
    gradientRectangle.style.background = `${gradientType}-gradient(to right, ${gradientString})`;
  } else if (gradientType === 'radial') {
    gradientRectangle.style.background = `${gradientType}-gradient(circle, ${gradientString})`;
  }

  updateCodeBox(gradientString);
  updateGradientPreview(gradientString);
  updateWrapBgGradient(gradientString);
}

function updateGradientPreview(gradientString) {
  const gradientPreview = document.getElementById('gradient-preview');
  if (gradientType === 'linear') {
    gradientPreview.style.background = `${gradientType}-gradient(${gradientDegrees}deg, ${gradientString})`;
  } else if (gradientType === 'radial') {
    gradientPreview.style.background = `${gradientType}-gradient(circle, ${gradientString})`;
  }
}

function updateWrapBgGradient(gradientString) {
  const wrap = document.querySelector('.wrap');
  if (gradientType === 'linear') {
    wrap.style.background = `${gradientType}-gradient(${gradientDegrees}deg, ${gradientString})`;
  } else if (gradientType === 'radial') {
    wrap.style.background = `${gradientType}-gradient(circle, ${gradientString})`;
  }
}