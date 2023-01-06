import {SRtoIR} from './parsers/SR-IR.js';
import {IRtoSR} from './parsers/IR-SR.js';
import {IRtoAR} from './parsers/IR-AR.js';

export function fileStringFromIR(IRset, algo, structure){
    // convert IRset to SRset
    var SRset = []
    for(var i=0; i<IRset.length; i++){
        const optSR = IRtoSR(IRset[i])
        SRset.push(optSR)
    }  

    //build file
    var date = (new Date()).toLocaleDateString('en-CH');
    var time = (new Date()).toLocaleTimeString('en-CH');
    var string = "\n"

    //buid the header of the file
    string += "Algorithm:\t"+algo+"\n"
    string += "Structure:\t"+IRtoSR(structure)+"\n"
    string += "Score: \t\t"+IRtoAR(IRset[0]).score()+"\n"
    string += "Date:\t\t"+date+" "+time+"\n\n"

    //fill the file with content
    for(var i=0; i<SRset.length; i++){
        //take care of fencepost issues
        if(i+1 != SRset.length){
            string+=SRset[i]+"\n"
        }else{
            string+=SRset[i]
        }
        
    }

    return string
}

export function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// reads a file and returns an SRset.
// it is assumed that the file {filename} is in the "/file" directory

export function readFile(filename){
    return fetch('files/'+filename)
    .then(response => response.text())
    .then(text => {
        const array = text.split("\n")
        array.splice(0,5)

        return array
    })
}

export function SRsetsToIRsets(SRsets){
    const IRsets = Array(0)
    for(var s=0; s<SRsets.length; s++){
        const IRset = Array(0)
        const SRset = SRsets[s]
        for(var i=0; i<SRset.length; i++){
            IRset.push(SRtoIR(SRset[i]))
        }
        IRsets.push(IRset)
    }
    return IRsets
}