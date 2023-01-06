
// class for SelectedObject
export class SO{
    // consists of single IR, SIR ID, and tile ID 
    constructor(sir=null, sirID=-1, tid=-1, timestamp=0, distance=Number.MAX_SAFE_INTEGER, type='quad'){
        this.sir = sir;
        this.sirID = sirID;
        this.tid = tid;
        this.timestamp = timestamp
        this.distance = distance

        //possible tags
        // select:  default
        // add:     add SIR to IR
        // remove:  remove SIR from IR

        this.tag = 'select'
        this.type = type
    }

    setTag(tag){
        this.tag = tag
    }

    getTag(){
        return this.tag
    }

    getSIR(){
        return this.sir
    }

    setSIR(sir){
        this.sir = sir
    }

    getID(){
        return this.sirID
    }

    getTID(){
        return this.tid
    }

    setTID(tid){
        this.tid = tid
    }

    setID(id){
        this.sirID = id
    }

    getTimeStamp(){
        return this.timestamp
    }

    getDistance(){
        return this.distance
    }

    tileSelected(sirID, tid){
        return sirID==this.sirID && tid==this.tid
    }

    quadSelected(sirID){
        return sirID==this.sirID
    }

    getType(){
        return this.type
    }

    setType(type){
        this.type = type
        return this
    }
}