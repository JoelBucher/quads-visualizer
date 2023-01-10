import { IRtoAR } from "../parsers/IR-AR"

export class IR{
    constructor(){
        const max = Number.MAX_SAFE_INTEGER
        const min = -Number.MAX_SAFE_INTEGER

        this.list = Array(0)
        this.minCorner = new Array(max,max,max)
        this.maxCorner = new Array(min,min,min)
        this.centerPoint = [0,0,0]
        this.dimension = [0,0,0]
    }

    //adds SIR and updates dimension & translation vectors
    add(sir){
        // update translation and dimension metrics
        const pos = sir.position
        //update size of IR bounding box
        for(var a=0; a<this.minCorner.length; a++){
            this.minCorner[a] = Math.min(this.minCorner[a], pos[a])
            this.maxCorner[a] = Math.max(this.maxCorner[a], pos[a])
        }

        const axis = sir.rotation.axis
        switch(axis){
            case 'x':
                if(pos[0] == this.maxCorner[0]){this.maxCorner[0]++}
                break
            case 'y':
                if(pos[1] == this.maxCorner[1]){this.maxCorner[1] = parseInt(this.maxCorner[1]) + 1}
                break
            case 'z':
                if(pos[2] == this.maxCorner[2]){this.maxCorner[2]++}
                break
        }

        // update dimension vector
        for(var i=0; i<this.dimension.length; i++){
            this.dimension[i] = (this.maxCorner[i] - this.minCorner[i]) + 1
        }

        // update center point
        for(var i=0; i<this.centerPoint.length; i++){
            this.centerPoint[i] = (this.maxCorner[i] + this.minCorner[i])/2.0
        }
        

        // finally, we add the new SIR
        this.list.push(sir.clone())
    }

    set(sir, i){
        if(i>=0 && i<this.size()){
            this.list[i] = sir
        }
    }

    get(index){
        return this.list[index]
    }

    remove(index){
        this.list.splice(index, 1);
    }

    size(){
        return this.list.length
    }

    // if all dominoes have equal size t, dominoSize() returns t. Else it returns -1
    dominoSize(){
        if(this.size() == 0){return -1}

        var t = this.list[0].size()
        for(var i=0; i<this.size(); i++){
            if(t!=this.list[i].size()){return -1}
        }
        return t
    }

    maxDominoSize(){
        var max = 0
        for(var i=0; i<this.size(); i++){
            max = Math.max(max,this.get(i).size())
        }
        return max
    }

    setSIRlist(list){
        this.list = list
    }

    clone(){
        var c = new IR()
        for(var i=0; i<this.size(); i++){
            c.add(this.get(i))
        }
        return c
    }

    //merges this IR with another one
    merge(ir){
        this.list = this.list.concat(ir.list)
        return this.clone()
    }

    uniqueQuads(){
        var visited = new Set()
        for(var i=0; i<this.size(); i++){
            const curColorID = this.get(i).getColorID()
            if(visited.has(curColorID)){
                return false
            }else{
                visited.add(curColorID)
            }
        }
        return true
    }

    //removes all color attributes of structure
    removeColors(){
        for(var i=0; i<this.size(); i++){
            this.list[i] = this.list[i].removeColors()
        }
        return this
    }

    theoreticalScore(){
        const clone = this.clone()
        const noColors = clone.removeColors()
        const theoreticalScore = IRtoAR(noColors).score()
        return theoreticalScore
    }

    colorScore(){
        return IRtoAR(this).score()
    }


}

