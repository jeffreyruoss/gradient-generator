import './style.css'
import './css/main.css'
import './src/main.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div id="gradient-container">
      <div id="gradient-rectangle">
        <div class="marker" style="left: 0%;">
          <input type="color" value="#000000" class="color-picker">
        </div>
        <div class="marker" style="left: 100%;">
          <input type="color" value="#FFFFFF" class="color-picker">
        </div>
      </div>
    </div>
  </div>
`