import { booleanCombinations } from "../algorithms/helper/combinatorics.js"
import { Cube } from "./Cube.js"

export class AR {
    constructor(X, Y, Z, length) {
        this.X = X
        this.Y = Y
        this.Z = Z

        //size is the number of quads
        this.length = length

        //allows coordinates to be negative
        this.translateX = 0
        this.translateY = 0
        this.translateZ = 0

        this.array = new Array(X)
        for(var i=0; i<X; i++){
            this.array[i] = new Array(Y)
            for(var j=0; j<Y; j++){
                this.array[i][j] = new Array(Z)
            }
        }
    }

    size(){
        return this.length
    }

    addCube(x,y,z,c){
        //convert true coordinates to array coordinates
        const arrX = x - this.translateX
        const arrY = y - this.translateY
        const arrZ = z - this.translateZ

        console.assert(this.array[arrX][arrY][arrZ]==null)
        this.array[arrX][arrY][arrZ] = c
    }


    score(){
        const fun = function(idA, idB, counter){ 
            counter['value']++
        }
        const obj = {'value': 0}
        const score = this.onTileMatch(fun,obj)['value']

        //connections are counted twice, therefore we need to divide the score by 2
        return score/2
    }

    // this function executes {func} every time there is a color match (i.e. a valid connection) between two tiles.
    // Note: Connections between two tiles are counted twice.
    // counter is an object of the form obj = {'value': val}

    onTileMatch(f,counter){
        for(var x = 0; x<this.X; x++){
            for(var y = 0; y<this.Y; y++){
                for(var z = 0; z<this.Z; z++){
                    const middle = this.array[x][y][z]
                    if(middle != null){
                        const rightCube   = this.getCube(x+1,y,z)
                        const leftCube    = this.getCube(x-1,y,z)
                        const topCube     = this.getCube(x,y+1,z)
                        const bottomCube  = this.getCube(x,y-1,z)
                        const frontCube   = this.getCube(x,y,z+1)
                        const backCube    = this.getCube(x,y,z-1)

                        const id = middle.id

                        compareTiles(middle.top,    topCube.bottom, id, topCube.id)
                        compareTiles(middle.bottom, bottomCube.top, id, bottomCube.id)
                        compareTiles(middle.left,   leftCube.right, id, leftCube.id)
                        compareTiles(middle.right,  rightCube.left, id, rightCube.id)
                        compareTiles(middle.front,  frontCube.back, id, frontCube.id)
                        compareTiles(middle.back,   backCube.front, id, backCube.id)

                        function compareTiles(tileA, tileB, idA, idB){
                            if(tileA === tileB && tileA != null){
                                f(idA, idB, counter)
                            }
                        }
                    }
                }
            }
        }
        return counter
    }

    //returns an empty cube if not found
    getCube(x,y,z){
        const empty = new Cube()

        if(x<this.X && y < this.Y && z<this.Z && x>=0 && y>=0 && z>=0){
            const element = this.array[x][y][z]
            if(element != null){
                return element
            }else{
                return empty
            }
        }else{
            
            return empty
        }
    }

    //returns an array of IR id's that span the volume of the structure
    getBoundingBox(){
        var cornerCubes  = new Set()
        var edgeCubes    = new Set()
        var sideCubes    = new Set()

        var arr = [
            [this.X, this.Y, this.Z, function(x,y,z,o){return o.getCube(x,y,z)}],
            [this.X, this.Z, this.Y, function(x,z,y,o){return o.getCube(x,y,z)}],
            [this.Z, this.Y, this.X, function(z,y,x,o){return o.getCube(x,y,z)}],
        ]

        for(var i=0; i<arr.length; i++){
            for(var a = 0; a<arr[i][0]; a++){
                for(var b = 0; b<arr[i][1]; b++){
                    const c1 = arr[i][3](a,b,0,this)
                    const c2 = arr[i][3](a,b,arr[i][2]-1,this)

                    addCubeToList(c1)
                    addCubeToList(c2)

                    function addCubeToList(c){
                        const aFirst    = a == 0
                        const bFirst    = b == 0
                        const aLast     = a-1==arr[i][0]
                        const bLast     = b-1==arr[i][1]

                        if(c != null){
                            if((aFirst || aLast) && (bFirst || bLast)){
                                //corner cube
                                cornerCubes.add(c.id)
                            }else if(aFirst || bFirst || aLast || bLast){
                                //edge cube
                                edgeCubes.add(c.id)
                            }else{
                                //side cube
                                sideCubes.add(c.id)
                            }
                        }
                    }
                }
            }
        }

        return [cornerCubes, edgeCubes, sideCubes]


        // check if two quads form diagonal corners
    }


    /** corners Array
     *  0: (0,0,0)
     *  1: (0,0,Z)
     *  2: (0,Y,0)
     *  3: (0,Y,Z)
     *  4: (X,0,0)
     *  5: (X,0,Z)
     *  6: (X,Y,0)
     *  7: (X,Y,Z)
     * 
     *  1. Diagonal: 0,7
     *  2. Diagonal: 1,6
     *  3. Diagonal: 2,5
     *  4. Diagonal: 3,4
     */

    getDiagonals(){
        var corners = this.getCorners()
        var diagonals = new Array(0)
        for(var i=0; i<corners.length; i++){
            const c1 = corners[i]
            const c2 = corners[corners.length-i]

            if(c1 != null && c2 != null){
                diagonals.push([c1,c2])
            }
        }
        return diagonals
    }

    getCorners(){
        var corners = new Array(8)
        
        //array of all True/False combinations of size 3 (because we have 3 dimensions)
        var bool = booleanCombinations(3)

        for(var i = 0; i<bool.length; i++){
            var corner = [this.X-1,this.Y-1,this.Z-1]
            for(var d = 0; d<bool[i].length; d++){
                if(!bool[i][d]){
                    corner[d] = 0
                }
            }
            const cornerCube = this.getCube(corner[0], corner[1], corner[2])
            corners[i] = cornerCube
        }

        return corners
    }
}