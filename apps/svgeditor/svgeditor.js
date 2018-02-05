const SVG = require('svg.js')
const {dialog, Menu} = require('electron').remote
const fs = require('fs');
const path = require('path')

const template = [ 
    {
        label : 'File',
        submenu : [
            {
                label : 'Open',
                click() { openSVG()}
            },
            {
                label : 'Save',
                click() { saveSVG()}
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

let canvas = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)

saveSVG = () => {
    const fileName = dialog.showSaveDialog( 
        options={
            title : "Export SVG"
        }, 
        callback = (fileName) => {
            if (fileName === undefined){
                console.log("You didn't save the file");
                return;
            }
        
            // fileName is a string that contains the path and filename created in the save file dialog.  
            fs.writeFile(fileName, canvas.svg(), (err) => {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                }
                            
                alert("The file has been succesfully saved");
            });
        } 
    )
}

openSVG = () => {
    const fileNames = dialog.showOpenDialog( {
        options: {
            title : "Import SVG",
            multiSelections: false
        }, 
        filters: [
            {name : 'SVG', extensions:['svg']}
        ]
    })

    if (fileNames === undefined || fileNames.size <= 0){
        console.log("You didn't open the file");
        return;
    }

    loadSVG(fileNames[0])

}

loadSVG = (fileName) => {
    canvas = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)

    console.log(fileName)
    fs.readFile(fileName, 'utf-8', (err, data ) => {
        if(err){
            alert("Failed to load input file " + err.message)
        } else {
            canvas.svg(data)

            drawText()
        }
    })
}

drawText = () => {
    const text = canvas.text("Hello1")
    .x(200)
    .y(200)

    text.font({
    family:   'Helvetica'
    , size:     100
    })
}