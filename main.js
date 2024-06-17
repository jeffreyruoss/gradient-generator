import './style.css'
import './css/main.css'
import './css/gradient-editor.css'
import './css/saved-gradients.css'
import './src/main.js'
import './src/vendor/coloris.min.css'
import './src/vendor/coloris.min.js'
import { createGradientContainer } from './src/components/GradientContainer.js'
import { createMarker, createMarkers } from './src/components/Marker/Marker.js'
import { gradientStops } from './src/lib/gradient-stops.js'
import { createSavedGradients } from './src/components/SavedGradientsSection.js'

const markers = gradientStops.map((stop, index) => createMarker(`${stop.position}%`, stop.color, index));

document.querySelector('#app').innerHTML = `
  <div class="wrap">
    <div class="main">
      <h1>Gradient Generator</h1>
      ${createGradientContainer(createMarkers())}
      ${createSavedGradients()}
    </div >
  </div >
  `;