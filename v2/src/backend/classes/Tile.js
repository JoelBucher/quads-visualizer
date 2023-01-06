export class Tile{

    constructor(sirID, tid, color){
        this.color = color
        this.sirID = sirID
        this.tid = tid
    }


    getColor(){
        return this.color
    }

    getID(){
        return this.sirID
    }
}