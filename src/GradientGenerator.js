
import './../style.css';
import './../css/main.css';
import './../css/gradient-editor.css';
import './../css/saved-gradients.css';
import './../css/code-box.css';
import './vendor/coloris.min.css';
import './vendor/coloris.min.js';
import { init } from './lib/init.js';
import { createGradientContainer } from './components/GradientContainer.js';
import { createSavedGradients } from './components/SavedGradientsSection/SavedGradientsSection.js';
import { createCodeBox } from './components/CodeBox.js';

export class GradientGenerator {
  constructor(containerId) {
    this.containerId = containerId;
  }

  render() {
    document.querySelector(`#${this.containerId}`).innerHTML = `
      <div class="wrap">
        <div class="main">
          <h1>Gradient Generator</h1>
          ${createGradientContainer()}
          ${createCodeBox()}
          ${createSavedGradients()}
        </div>
      </div>
    `;

    document.addEventListener('DOMContentLoaded', () => init());
  }
}