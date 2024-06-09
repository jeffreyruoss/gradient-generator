import './style.css'
import './css/main.css'
import './src/main.js'
import './src/vendor/coloris.min.css'
import './src/vendor/coloris.min.js'
import { createGradientContainer } from './src/components/GradientContainer.js'
import { createMarker } from './src/components/Marker.js'

const marker1 = createMarker('0%', '#000000');
const marker2 = createMarker('100%', '#FFFFFF');
const gradientContainer = createGradientContainer(marker1 + marker2);

document.querySelector('#app').innerHTML = `
  <div>
    ${gradientContainer}
  </div>
`;