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

    translateX(x){
        this.translatePosition(x,0,0)
        return this
    }

    translateY(y){
        this.translatePosition(0,y,0)
        return this
    }

    translateZ(z){
        this.translatePosition(0,0,z)
        return this
    }

    translatePosition(x,y,z){
        for(var l=0; l<this.size(); l++){
            this.list[l].translatePosition(x,y,z)
        }
        return this
    }

    rotateX(clicks){return this.rotateAroundAxis(clicks, 0)}
    rotateY(clicks){return this.rotateAroundAxis(clicks, 1)}
    rotateZ(clicks){return this.rotateAroundAxis(clicks, 2)}

    rotateAroundAxis(clicks, axis){
        for(var c=0; c<clicks; c++){
            for(var l=0; l<this.size(); l++){
                this.get(l).rotateAroundAxis(axis)
            }
        }
        return this
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

    //eliminates negative position values (and updates pivot points of quads : TODO)
    normalize(){

        //normalize structure position (make them positive)
        var minX = 0;
        var minY = 0;
        var minZ = 0;
        for(var l=0; l<this.size(); l++){
            const pos = this.get(l).position
            if(pos[0] < minX){ minX = pos[0] }
            if(pos[1] < minY){ minY = pos[1] }
            if(pos[2] < minZ){ minZ = pos[2] }
        }
    }

    // returnes a (rotation & translation invariant) position identifier for a SIR
    relativePositionID(sir){
        const absPos = sir.position

        const relPos = new Array(3)
        for(var i=0; i<relPos.length; i++){
            relPos[i] = absPos[i] - this.minCorner[i]
        }

        relPos.sort()
        return relPos[0] + "-" + relPos[1] + "-" + relPos[2]
    }

    // returnes a (rotation & translation invariant) dimension identifier the IR
    dimensionID(){
        var dims = [this.X, this.Y, this.Z].sort()
        return dims[0] + "-" + dims[1] + "-" + dims[2]
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


    // UNDER CONSTRUCTION
    //checks if structure is the same (rotation and position translation invariant)
    sameStructure(otherIR){
        // both IR's must have a size that is non-zero. Else {false} is returned
        if(otherIR.size() <= 0 && this.size() <= 0){return false}

        // early stopping criteria: structures do not have the same dimension ID
        // we need to translate IR to AR in order to obtain dimensionID
        const thisDimID = this.dimensionID()
        const otherDimID = otherIR.dimensionID()
        
        if(!thisDimID.equals(otherDimID)){return false}

        // idea: if both structures A,B are equal, every sir in A has a corresponding sir in B.
        // We therefore choose one sir in A and fit it against every sir in B.
        // If both structures are the same we have at least one hit

        //initialize sirToFit and SIRpool. Make SIRpool as small as possible
        if(this.size() > otherIR.size()){
            var sirToFit = this.get(0)
            var SIRpool = otherIR.list
        }else{
            var sirToFit = otherIR.get(0)
            var SIRpool = this.list
        }

        //calculate translation invariant position id
        const sirToFitPosID = this.relativePositionID(sirToFit)

        for(var i = 0; i<SIRpool.length; i++){
            const sir = SIRpool[i]
            const sirPosID = sir.relativePositionID(sir)

            //TODO


        }

        return false
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

