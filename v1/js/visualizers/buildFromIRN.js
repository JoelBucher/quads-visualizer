import { getColor } from './helper.js';
import './constants.js';
import * as constants from "./constants.js";

export function buildFromIRN(irn, scene){
    for(var i=0; i<irn.size(); i++){
        if(irn.get(i).status=="success"){
            const quad = buildFromSIR(irn.get(i))
            scene.add(quad)
        }
    }
}

function buildFromSIR(sirn){
    //build object following parserObject description
    const quad = new THREE.Group();
    const xCoord = sirn.position[0]
    const yCoord = sirn.position[1]
    const zCoord = sirn.position[2]
    quad.position.set(0.5 + xCoord, 0.5 + yCoord, 0.5 + zCoord)

    const colors = sirn.structure.colors
    const size = colors.length
    const axis = sirn.rotation.axis
    const degree = sirn.rotation.degree

    for(var s=0; s<size; s++){
        var tile = null
        var white = null

        //bottom tile
        if(s==0){
            tile = new THREE.Mesh(constants.tb, getColor(colors[s]))
            tile.position.set( 0, s-0.45 , 0 );
            
            white = new THREE.Mesh(constants.bar, constants.white)
            white.position.set(0,s-0.45,0.55)

        //top tile
        }else if(s+1==size){
            tile = new THREE.Mesh(constants.tb, getColor(colors[s]))
            tile.position.set( 0, s-1.35 , 0 );

            white = new THREE.Mesh(constants.bar, constants.white)
            white.position.set(0,s-1.35,0.55)

        //tiles in between
        }else{
            tile = new THREE.Mesh(constants.fb, getColor(colors[s]))
            tile.position.set( 0, s-0.9, 0.55 );
        }
        quad.add(tile)

        if(white != null){
            quad.add(white)
        }
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