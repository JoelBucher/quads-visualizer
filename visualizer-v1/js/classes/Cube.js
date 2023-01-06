export class Cube {
    static top = null
    static bottom = null
    static left = null
    static right = null
    static front = null
    static back = null

    constructor(id){
        this.id = id
    }

    rotateAroundY(){
        //save state of the old cube (deep copy)
        const prev = JSON.parse(JSON.stringify(this)); 

        this.front = prev.left
        this.right = prev.front
        this.back = prev.right
        this.left = prev.back
    }

    rotateAroundX(){
        //save state of the old cube (deep copy)
        const prev = JSON.parse(JSON.stringify(this)); 

        this.front = prev.top
        this.bottom = prev.front
        this.back = prev.bottom
        this.top = prev.back
    }

    rotateAroundZ(){
        //save state of the old cube (deep copy)
        const prev = JSON.parse(JSON.stringify(this)); 

        this.top = prev.right
        this.left = prev.top
        this.bottom = prev.left
        this.right = prev.bottom
    }
}