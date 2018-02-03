const gaugeLibrary = require('../../tpscripts/gauge.min.js')

const opts = {
    angle: -0.2, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    
  };


function WifiGauge(document, parentElement, channelName){

    const gaugeElement = document.createElement("div")
    gaugeElement.className = "gauge-item"
    parentElement.appendChild(gaugeElement)

    const canvasElement = document.createElement("canvas")
    gaugeElement.appendChild(canvasElement)

    const nameElement = document.createElement("p")
    gaugeElement.appendChild(nameElement)
    nameElement.innerHTML = channelName

    this.gauge = new gaugeLibrary.Gauge(canvasElement).setOptions(opts)
    this.gauge.maxValue = 100 // set max gauge value
    this.gauge.setMinValue(0)  // Prefer setter over gauge.minValue = 0
    this.gauge.animationSpeed = 107 // set animation speed (32 is default value)

    this.name = channelName
    
    this.setValue = (value) => {
        this.gauge.set(value)
    } 
}

module.exports = WifiGauge