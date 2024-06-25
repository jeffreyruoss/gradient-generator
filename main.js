import './style.css'
import './css/main.css'
import './css/gradient-editor.css'
import './css/saved-gradients.css'
import './css/code-box.css'
import './src/vendor/coloris.min.css'
import './src/vendor/coloris.min.js'
import { init } from './src/lib/init.js';
import { createGradientContainer } from './src/components/GradientContainer.js'
import { createSavedGradients } from './src/components/SavedGradientsSection/SavedGradientsSection.js'
import { createCodeBox } from './src/components/CodeBox.js'

document.querySelector('#app').innerHTML = `
  <div class="wrap">
    <div class="main">
      <h1>Gradient Generator</h1>
      ${createGradientContainer()}
      ${createCodeBox()}
      ${createSavedGradients()}
    </div >
  </div >
  `;

document.addEventListener('DOMContentLoaded', () => init());