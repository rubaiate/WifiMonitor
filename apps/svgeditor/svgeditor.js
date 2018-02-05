const SVG = require('svg.js')
const {dialog, Menu} = require('electron').remote
const fs = require('fs');
const path = require('path')

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

const inputFileName = path.join(__dirname, '../../resources/images/sample.svg')
console.log("Input file name " + inputFileName)
fs.readFile(inputFileName, 'utf-8', (err, data ) => {
    if(err){
        alert("Failed to load input file " + err.message)
    } else {
        canvas.svg(data)

        //since text was drawn onto canvas before drawing external svg 
        //text should be moved into front again
        text.front();
    }
})


const text = canvas.text("Hello1")
.x(200)
.y(200)

text.font({
family:   'Helvetica'
, size:     100
// , anchor:   'middle'
// , leading:  '1.5em'
})

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