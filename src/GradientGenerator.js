
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
      ${createGradientContainer()}
      ${createCodeBox()}
      ${createSavedGradients()}
    `;

    document.addEventListener('DOMContentLoaded', () => init());
  }
}