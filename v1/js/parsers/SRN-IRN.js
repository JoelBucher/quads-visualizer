import {IRN} from '../classes/IRN.js'
import {SIRN} from '../classes/SIRN.js'

export function SRNtoIRN(input){
    const regexRule = /\((.*?)\)/g;
    const list = extractValues(input, regexRule)
    var output = new IRN()
    for(var i=0; i<list.length; i++){
        console.log(SRNtoSIRN(list[i], i))
        output.add(SRNtoSIRN(list[i], i))
    }
    return output
}

function SRNtoSIRN(input, fromID){
    var status = "success"
    var regex = /(([a-z]+),)([a-z]+),([0-9]+)-[<>][<>]-([xyz])([0123])-(([a-z])+|([0-9]+))/g;
    var con, str, rot = null

    if(regex.test(input)){
        con = parseConnection(input, fromID)
        rot = parseRotation(input)
        str = parseStructure(input)

        if(str.size <= 2){
            status = "quads must have at least size 3"
            pos = str = rot = null
        }
    }else{
        status = "your input does not meet the specifications"
    }
    return new SIRN(con[0], con[1], rot, str, status)
}

function skipDash(input, skips){
    var index = 0;
    for(var i = 0; i <= skips; i++){
        while(input[index]!='-'){index++;}
        index++;
    }
    return index;
}

function parseConnection(input, fromID){
    // ----------------------
    // parsing: tileA, tileB, toID - connectionA connectionB
    // example: a,b,0->>
    // ----------------------

    const tiles = parseConnectingTiles(input)
    const sides = parseConnectionType(input)
    const toID = parseToID(input)

    // construct from
    const from = {"tile": tiles[0], "quad": fromID, "side": sides[0]}

    //construct to
    const to = {"tile": tiles[1], "quad": toID, "side": sides[1]}

    return [from,to]
}

function parseToID(input){
    // parsing toID
    var index = skipDash(input, 0);

    // parsing toID
    const toIdRegexRule = /([0-9]+)/g;
    const toID = parseInt(extractValues(input.slice(0,index), toIdRegexRule)[0])

    return toID
}

function parseConnectingTiles(input){
    // parsing tileA, tileB
    var index = skipDash(input, 0);

    // filter for values a-z (there are exactly two)
    const tileRegexRule = /([a-z]+)/g;
    var tiles = extractValues(input.slice(0,index), tileRegexRule)

    for(var i=0; i<tiles.length; i++){
        tiles[i] = tiles[i].charCodeAt(0) - 'a'.charCodeAt(0)
    }

    return tiles
}

function parseConnectionType(input){
    var i = skipDash(input, 0);

    return [input[i], input[i+1]]
}

function parseRotation(input){
    // ----------------------
    // parsing: axisDegree
    // example: x0
    // ----------------------

    var index = skipDash(input, 1);
    return {
        axis: input[index],
        degree: input[index+1],
    }
}

function parseStructure(input){
    // ----------------------
    // parsing: Structure
    // example: rybg
    // ----------------------

    var length;
    var index = skipDash(input, 2);

    //extract concrete color values
    const regexRule = /([a-z])/g;
    const colorVals = extractValues(input.slice(index,input.length), regexRule)

    if(colorVals.length == 0){
        //if color vals array is empty, parse it as an integer
        length = parseInt(input.slice(index, input.length))

        //fill color array with gray values
        for(var i=0; i<length; i++){
            colorVals.push('x')
        }
    }

    return {
        colors: colorVals
    }
}

function extractValues(s,re){
    var arr = [],
    item;
    while (item = re.exec(s)){
        arr.push(item[1]);
    }

    return arr
}
