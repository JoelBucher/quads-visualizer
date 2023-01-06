import { getColor } from './helper.js';
import './constants.js';
import * as constants from "./constants.js";

export function buildFromIR(IR, scene){
    for(var i=0; i<IR.size(); i++){
        if(IR.get(i).status=="success"){
            const quad = buildFromSIR(IR.get(i))
            scene.add(quad)
        }
    }
}

function buildFromSIR(SIR){
    //build object following parserObject description
    const quad = new THREE.Group();
    const xCoord = SIR.position[0]
    const yCoord = SIR.position[1]
    const zCoord = SIR.position[2]
    quad.position.set(0.5 + xCoord, 0.5 + yCoord, 0.5 + zCoord)

    const colors = SIR.structure.colors
    const size = colors.length
    const axis = SIR.rotation.axis
    const degree = SIR.rotation.degree

    for(var s=0; s<size; s++){
        var tile = null
        //bottom tile
        if(s==0){
            tile = new THREE.Mesh(constants.tb, getColor(colors[s]))
            tile.position.set( 0, s-0.5 , 0 );

        //top tile
        }else if(s+1==size){
            tile = new THREE.Mesh(constants.tb, getColor(colors[s]))
            tile.position.set( 0, s-1.5 , 0 );

        //tiles in between
        }else{
            tile = new THREE.Mesh(constants.fb, getColor(colors[s]))
            tile.position.set( 0, s-1, 0.5 );
        }
        quad.add(tile)
    }
    //rotate group as specified in rotate & orientation fields

    if(axis == 'x'){
        quad.rotateZ((Math.PI/2.0)*3)
    }else if(axis == 'z'){
        quad.rotateX((Math.PI/2.0))
    }
    quad.rotateY((Math.PI/2.0) * degree)

    return quad
}