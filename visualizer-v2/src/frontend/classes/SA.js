// selected Algorithm Class


export class SA{
    constructor(name, icon, algorithm){
        this.name = name
        this.icon = icon
        this.percent = 0
        this.state = 'notClicked'
        this.algorithm = algorithm
    }

    setPercent(percent){
        this.percent = percent
    }

    getPercent(){
        return this.percent
    }

    isClicked(){
        return this.state === 'clicked'
    }




}