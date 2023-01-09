import {IR} from '../classes/IR.js'
import {SIR} from '../classes/SIR.js'

export function SRtoIR(input){
    const regexRule = /\((.*?)\)/g;
    const list = extractValues(input, regexRule)
    var output = new IR()
    for(var i=0; i<list.length; i++){
        output.add(SRtoSIR(list[i]))
    }
    return output
}

function SRtoSIR(input){
    var status = "success"
    var regex = /(([0-9]+),)([0-9]+),([0-9]+)\/([xyz])([0123])\/(([a-z])+|([0-9]+))/g;
    var pos, str, rot = null

    if(regex.test(input)){
        pos = parsePosition(input)
        rot = parseRotation(input)
        str = parseStructure(input)

        if(str.size < 1){
            status = "quads must have at least size 1"
            pos = str = rot = null
        }else if(pos == null){
            status = "quads position must be in 2D or 3D space"
            pos = str = rot = null
        }
    }else{
        status = "your input does not meet the specifications"
    }
    return new SIR(pos, rot, str, status)
}

function skipDash(input, skips){
    var index = 0;
    for(var i = 0; i <= skips; i++){
        while(input[index]!='/'){index++;}
        index++;
    }
    return index;
}

function parseRotation(input){
    var index = skipDash(input, 0);
    return {
        axis: input[index],
        degree: input[index+1],
    }
}

function parseStructure(input){
    var length;
    var index = skipDash(input, 1);

    //extract concrete color values
    const regexRule = /([a-z])/g;
    const colorVals = extractValues(input.slice(index,input.length), regexRule)

    if(colorVals.length == 0){
        //if color vals array is empty, parse it as an integer
        length = parseInt(input.slice(index, input.length))+2

        //fill color array with gray values
        for(var i=0; i<length; i++){
            colorVals.push('x')
        }
    }

    return {
        colors: colorVals
    }
}

function parsePosition(input){    
    var index = skipDash(input, 0);
    
    const regexRule = /([0-9]+)/g;
    var values = extractValues(input.slice(0,index), regexRule)
    
    for(var i=0; i<values.length; i++){
        values[i] = parseInt(values[i])
    }

    //convert two dimensional points to three dimensional ones
    if(values.length==2){
        values.push(0)
        values[2] = values[1]
        values[1] = 0
    }
    
    //throw error if dimension neither 2 nor 3
    if(values.length < 2 || values.length > 3){
        return null
    }

    return values
}

function extractValues(s,re){
    var arr = [],
    item;
    while (item = re.exec(s)){
        arr.push(item[1]);
    }

    return arr
}
