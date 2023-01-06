export class IRN{
    constructor(){
        this.list = Array(0)
    }

    //adds SIRN
    add(sirn){
        this.list.push(sirn)
    }

    get(index){
        return this.list[index]
    }

    size(){
        return this.list.length
    }

    setSIRlist(list){
        this.list = list
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
        var c = new IRN()
        for(var i=0; i<this.size(); i++){
            c.add(this.get(i).clone())
        }
        return c
    }

    //merges this IRN with another one
    merge(irn){
        this.list = this.list.concat(irn.list)
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

    // returnes a (rotation & translation invariant) position identifier for a SIRN
    relativePositionID(sirn){
        const absPos = sirn.position

        const relPos = new Array(3)
        for(var i=0; i<relPos.length; i++){
            relPos[i] = absPos[i] - this.minCorner[i]
        }

        relPos.sort()
        return relPos[0] + "-" + relPos[1] + "-" + relPos[2]
    }

    // returnes a (rotation & translation invariant) dimension identifier the IRN
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
        // both IRN's must have a size that is non-zero. Else {false} is returned
        if(otherIR.size() <= 0 && this.size() <= 0){return false}

        // early stopping criteria: structures do not have the same dimension ID
        // we need to translate IRN to AR in order to obtain dimensionID
        const thisDimID = this.dimensionID()
        const otherDimID = otherIR.dimensionID()
        
        if(!thisDimID.equals(otherDimID)){return false}

        // idea: if both structures A,B are equal, every sirn in A has a corresponding sirn in B.
        // We therefore choose one sirn in A and fit it against every sirn in B.
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
            const sirn = SIRpool[i]
            const sirPosID = sirn.relativePositionID(sirn)

            //TODO


        }

        return false
    }


}

