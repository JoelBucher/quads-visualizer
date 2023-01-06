export class Corner {
    constructor(id){
        this.bottom = [null, null]
        this.left = [null, null]
        this.back = [null, null]
        this.id = id
    }

    addLeft(left){
        if(this.left[0] == null){
            this.left[0] = left
        }else{
            this.left[1] = left
        }
    }

    addBottom(bottom){
        if(this.bottom[0] == null){
            this.bottom[0] = bottom
        }else{
            this.bottom[1] = bottom
        }
    }

    addBack(back){
        if(this.back[0] == null){
            this.back[0] = back
        }else{
            this.back[1] = back
        }
    }

    onTileMatch(accVar, accFun){
        function handleTilePair(tuple){
            var c0, c1, id0, id1 = null
            if(tuple[0]!=null){
                c0 = tuple[0].getColor()
                id0 = tuple[0].getID()
            }

            if(tuple[1]!=null){
                c1 = tuple[1].getColor()
                id1 = tuple[1].getID()
            }

            const isTileMatch = c0==c1 && c0!=null
            if(isTileMatch){
                accVar = accFun(accVar, id0, id1)
            }
        }

        handleTilePair(this.back)
        handleTilePair(this.bottom)
        handleTilePair(this.left)

        return accVar
    }
    /*
    score(){
        function sc(tuple){
            if(tuple[0]!=null && tuple[1]!=null){
                return tuple[0].getColor() == tuple[1].getColor()
            }else{
                return 0
            }
        }

        const backScore = sc(this.back)
        const bottomScore = sc(this.bottom)
        const leftScore = sc(this.left)

        return backScore + bottomScore + leftScore
    }
    */
}