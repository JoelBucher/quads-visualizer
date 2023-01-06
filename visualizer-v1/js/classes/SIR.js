//singleton IR
export class SIR {
    static position     //[0,0,0]
    static rotation     //{axis: 'z', degree: 1}
    static structure    //{colors: ['x','x','x','x']}
    static status       //'success'

    constructor(pos, rot, str, status) {
        this.position = pos;
        this.rotation = rot;
        this.structure = str;
        this.status = status;
    }
    
    rotateAroundAxis(rotationAxis){
        const xPos = this.position[0]
        const yPos = this.position[1]
        const zPos = this.position[2]
        const axis = this.rotation.axis
        const deg = this.rotation.degree

        //compute new rotation
        const rotInstr = matrix[rotationAxis][parseInt(this.axisToID(axis))]
        this.rotation.degree = rotInstr.degFun(parseInt(deg))
        this.rotation.axis = rotInstr.axis

        //compute new position
        const pos = rotInstr.posFun(xPos, yPos, zPos)
        this.setPosition(pos[0], pos[1], pos[2])

        if(rotInstr.swap){
            this.swapColors()
        }

    }

    swapColors(){
        this.structure.colors.reverse()
    }

    setPosition(x,y,z){
        this.position[0] = x
        this.position[1] = y
        this.position[2] = z
    }

    translatePosition(x,y,z){
        this.position[0]+=x
        this.position[1]+=y
        this.position[2]+=z
    }

    axisToID(axis){
        if(axis === 'x'){
            return 0
        }else if(axis === 'y'){
            return 1
        }else{
            return 2
        }
    }
    // returns id that is invariant to quad swapping
    getColorID(){
        const c = JSON.parse(JSON.stringify(this.structure.colors));
        if(c[0]<c[c.length-1]){
            return c.join("")
        }else{
            return c.reverse().join("")
        }
    }

    clone(){
        var c = new SIR()
        c.position = JSON.parse(JSON.stringify(this.position));
        c.rotation = JSON.parse(JSON.stringify(this.rotation));
        c.structure = JSON.parse(JSON.stringify(this.structure));
        c.status = JSON.parse(JSON.stringify(this.status));

        return c
    }
}

