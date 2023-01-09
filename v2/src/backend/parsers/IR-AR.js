import {Corner} from '../classes/Corner.js';
import {AR} from '../classes/AR.js';
import {Tile} from '../classes/Tile.js';
import { getColorHEX } from '../visualizers/fibreHelper.js';
import { IRtoSR } from './IR-SR.js'

// this function converts quads from the Intermediate Representation (IR) to the Array Representation (AR)

export function IRtoAR(IR){
    //initialize array
    var maxDomino = IR.maxDominoSize()
    var array = new AR(
        IR.dimension[0]+maxDomino,
        IR.dimension[1]+maxDomino,
        IR.dimension[2]+maxDomino,
        IR.size())
    //set AR translation offsets
    array.translateX = parseInt(IR.minCorner[0])
    array.translateY = parseInt(IR.minCorner[1])
    array.translateZ = parseInt(IR.minCorner[2])

    //add quads to array
    for(var i = 0; i<IR.size(); i++){
        const pos = IR.get(i).position
        const axis = IR.get(i).rotation.axis
        const deg = IR.get(i).rotation.degree
        const col = IR.get(i).structure.colors

        var x = pos[0]-array.translateX
        var y = pos[1]-array.translateY
        var z = pos[2]-array.translateZ

        for(var s=0; s<col.length; s++){
            switch(axis){
                case 'x':
                    axisX(deg,s,i); break
                case 'y':
                    axisY(deg,s,i); break
                case 'z':
                    axisZ(deg,s,i); break
            }

            function axisX(deg, s, i){
                const tile = new Tile(i,s,getColorHEX(col[s]))
                
                if(s==0){
                    array.array[x+s][y][z].addLeft(tile)
                }else if(s+1==col.length){
                    array.array[x+s-1][y][z].addLeft(tile)
                }else{
                    switch(deg){
                        case '0':
                            array.array[x+s-1][y+1][z].addBottom(tile)
                            break;
                        case '1':
                            array.array[x+s-1][y][z+1].addBack(tile)
                            break;
                        case '2':
                            array.array[x+s-1][y][z].addBottom(tile)
                            break;
                        case '3':
                            array.array[x+s-1][y][z].addBack(tile)
                            break;

                    }
                }
            }

            function axisY(deg, s, i){
                const tile = new Tile(i,s,getColorHEX(col[s]))
                
                if(s==0){
                    array.array[x][y+s][z].addBottom(tile)
                }else if(s+1==col.length){
                    array.array[x][y+s-1][z].addBottom(tile)
                }else{
                    switch(deg){
                        case '0':
                            array.array[x][y+s-1][z].addLeft(tile)
                            break;
                        case '1':
                            array.array[x][y+s-1][z+1].addBack(tile)
                            break;
                        case '2':
                            array.array[x+1][y+s-1][z].addLeft(tile)
                            break;
                        case '3':
                            array.array[x][y+s-1][z].addBack(tile)
                            break;

                    }
                }
            }

            function axisZ(deg, s, i){
                const tile = new Tile(i,s,getColorHEX(col[s]))
                
                if(s==0){
                    array.array[x][y][z+s].addBack(tile)
                }else if(s+1==col.length){
                    array.array[x][y][z+s-1].addBack(tile)
                }else{
                    switch(deg){
                        case '0':
                            array.array[x][y+1][z+s-1].addBottom(tile)
                            break;
                        case '1':
                            array.array[x][y][z+s-1].addLeft(tile)
                            break;
                        case '2':
                            array.array[x][y][z+s-1].addBottom(tile)
                            break;
                        case '3':
                            array.array[x+1][y][z+s-1].addLeft(tile)
                            break;

                    }
                }
            }
        }

    }
    return array
}