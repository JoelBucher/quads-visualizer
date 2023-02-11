import {Cube} from '../classes/Cube.js';
import {AR} from '../classes/AR.js';

// this function converts quads from the Intermediate Representation (IR) to the Array Representation (AR)

export function IRtoAR(IR){
    //initialize array
    var array = new AR(IR.dimension[0], IR.dimension[1], IR.dimension[2], IR.size())

    //set AR translation offsets
    array.translateX = IR.minCorner[0]
    array.translateY = IR.minCorner[1]
    array.translateZ = IR.minCorner[2]

    //add quads to array
    for(var i = 0; i<IR.size(); i++){
        const pos = IR.get(i).position
        const axis = IR.get(i).rotation.axis
        const deg = IR.get(i).rotation.degree
        const col = IR.get(i).structure.colors

        var numberOfCubes = col.length - 2
        console.assert(numberOfCubes > 0)

        for(var j = 0; j<numberOfCubes; j++){
            var c = new Cube(i)
            //first cube
            if(j==0){
                c.bottom = col[0]
                c.front = col[1]
            
            //last cube
            }else if(j+1==numberOfCubes){
                c.front = col[j+1]
                c.top = col[j+2]

            //cubes in between
            }else{
                c.front = col[j+1]
            }

            //rotate cube
            for(var d=0; d<deg; d++){
                c.rotateAroundY()
            }
            

            //project cube's position onto the correct axis
            var cubeX = pos[0]
            var cubeY = pos[1]
            var cubeZ = pos[2]
            
            if(axis=='x'){
                //project cube position onto x-axis
                cubeX += j

            }else if(axis=='y'){
                //project cube position onto y-axis
                cubeY += j

            }else{
                //project cube position onto z-axis
                cubeZ += j
            }

            //project cube's orientation onto the correct axis
            if(axis=='x'){
                //rotate cube three clicks around its z-axis
                c.rotateAroundZ()
                c.rotateAroundZ()
                c.rotateAroundZ()

            }else if(axis=='z'){
                //rotate cube one click around its x-axis
                c.rotateAroundX()

            }else{
                //cube already on the correct axis
            }

            array.addCube(cubeX,cubeY,cubeZ,c)
        }
    } 
    return array
}