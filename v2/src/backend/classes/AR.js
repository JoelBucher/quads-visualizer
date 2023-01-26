import { Corner } from "./Corner.js"

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

        var key = 0
        for(var x=0; x<this.X; x++){
            this.array[x] = new Array(Y)
            for(var y=0; y<this.Y; y++){
                this.array[x][y] = new Array(Z)

                for(var z=0; z<this.Z; z++){
                    this.array[x][y][z] = new Corner(key)
                    key++
                }
            }
        }
    }

    size(){
        return this.length
    }

    onTileMatch(accVar, accFun){
        for(var x=0; x<this.X; x++){
            for(var y=0; y<this.Y; y++){
                for(var z=0; z<this.Z; z++){
                    accVar = this.array[x][y][z].onTileMatch(accVar, accFun)
                }
            }
        }
        return accVar
    }
    
    score(){
        var accVar = 0
        var accFun = (accVar, idA, idB) => {return accVar + 1}

        return this.onTileMatch(accVar, accFun)
    }
}