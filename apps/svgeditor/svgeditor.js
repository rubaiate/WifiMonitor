const SVG = require('svg.js')
const {dialog, Menu} = require('electron').remote
const fs = require('fs');

const template = [ 
    {
        label : 'File',
        submenu : [
            {
                label : 'Open'
            },
            {
                label : 'Save',
                click() {
                    saveSVG()
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

var canvas = SVG('drawing').size('100%', '100%').viewbox(0,0,800,1000)

// canvas.rect(100, 100).move(100, 50).fill('#f06')
const inputFileName = '../../resources/images/sample.svg'
fs.readFile(inputFileName, 'utf-8', (err, data ) => {
    console.log("File loaded")
    canvas.svg(data)
})
const text = canvas.text("Hello")
    .x(200)
    .y(200)

text.font({
    family:   'Helvetica'
    , size:     100
    // , anchor:   'middle'
    // , leading:  '1.5em'
    })
console.log(canvas.svg())

console.log(process.type)

saveSVG = () => {
    const fileName = dialog.showSaveDialog( 
        options={
            title : "Export SVG"
        }, 
        // filters = [
        //     { name:"SVG", extensions:['svg']}
        // ],
        callback = (fileName) => {
            if (fileName === undefined){
                console.log("You didn't save the file");
                return;
            }
        
            console.log("File Name" + fileName)
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