// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electronwifi = require('electronwifi')

const WifiGauge = require('./wifigauge')

const gauges = new Map()

const gaugesElement = document.getElementById('gauges');

function showWifi(){
    const wifidata = electronwifi.scanall()
  
    const channels = wifidata.arr;

    if(channels != null){

        channels.forEach(channel => {
            const gauge = getOrCreateGaugeNode(channel.name)
            const channelPower = Math.min(2*(channel.strength+100), 100)
            gauge.setValue(channelPower); // set actual value
        });

        const channelNames = channels.map(ch => ch.name)
        gauges.forEach(gauge=> {
            
            if(channelNames.indexOf(gauge.name)< 0){
                gauge.setValue(0)
            }
        })
    }
    setTimeout(showWifi, 3000)
}

function getOrCreateGaugeNode(channelName){
    if(gauges.has(channelName)){
        return gauges.get(channelName);
    }

    const gauge = new WifiGauge(document, gaugesElement, channelName);

    gauges.set(channelName, gauge)

    return gauge;
}



showWifi()
