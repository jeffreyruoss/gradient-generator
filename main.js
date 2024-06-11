import './style.css'
import './css/main.css'
import './src/main.js'
import './src/vendor/coloris.min.css'
import './src/vendor/coloris.min.js'
import { createGradientContainer } from './src/components/GradientContainer.js'
import { createMarker } from './src/components/Marker.js'
import { gradientStops } from './src/main.js'

const markers = gradientStops.map(stop => createMarker(`${stop.position}%`, stop.color));
const gradientContainer = createGradientContainer(markers.join(''));

document.querySelector('#app').innerHTML = `
  <div>
    ${gradientContainer}
  </div>
`;