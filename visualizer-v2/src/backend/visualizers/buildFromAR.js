import { getColor } from './helper.js';
import * as constants from "./constants.js";

export function buildFromAR(AR,scene){
    const xOffset = AR.translateX
    const yOffset = AR.translateY
    const zOffset = AR.translateZ

    for(var x=0; x<AR.X; x++){
        for(var y=0; y<AR.Y; y++){
            for(var z=0; z<AR.Z; z++){
                const cube = AR.getCube(x,y,z)
                if(cube != null){
                    if(cube.bottom != null){
                        const bottom = new THREE.Mesh(constants.tb, getColor(cube.bottom))
                        bottom.position.set(0.5+x+xOffset,0.05+y+yOffset,0.5+z+zOffset)
                        scene.add(bottom);
                    }

                    if(cube.top != null){
                        const top = new THREE.Mesh(constants.tb, getColor(cube.top))
                        top.position.set(0.5+x+xOffset,0.95+y+yOffset,0.5+z+zOffset)
                        scene.add(top);
                    }

                    if(cube.left != null){
                        const left = new THREE.Mesh(constants.lr, getColor(cube.left))
                        left.position.set(0.05+x+xOffset,0.5+y+yOffset,0.5+z+zOffset)
                        scene.add(left);
                    }

                    if(cube.right != null){
                        const right = new THREE.Mesh(constants.lr, getColor(cube.right))
                        right.position.set(0.95+x+xOffset,0.5+y+yOffset,0.5+z+zOffset)
                        scene.add(right);
                    }

                    if(cube.front != null){
                        const front = new THREE.Mesh(constants.fb, getColor(cube.front))
                        front.position.set(0.5+x+xOffset,0.5+y+yOffset,0.95+z+zOffset)
                        scene.add(front);
                    }

                    if(cube.back != null){
                        const back = new THREE.Mesh(constants.fb, getColor(cube.back))
                        back.position.set(0.5+x+xOffset,0.5+y+yOffset,0.05+z+zOffset)
                        scene.add(back);
                    }

                }
            }
        }
    }
}