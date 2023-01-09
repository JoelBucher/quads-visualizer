import { getColorHEX } from './fibreHelper.js';
import { SO } from '../../frontend/classes/SO.js';

export function fibreBuildFromIR(IR, updateClick, click, zoom){
    var res = []
    for(var i=0; i<IR.size(); i++){
        if(IR.get(i).status=="success"){
            const quad = buildFromSIR(IR.get(i), i, updateClick, click, IR.centerPoint, zoom)
            res.push(quad)
        }
    }
    return res
}

function buildFromSIR(SIR, i, updateClick, click, centerPoint, zoom){
    //build object following parserObject description

    //const xQuad = SIR.position[0]/10 + 0.5
    //const yQuad = SIR.position[1]/10 + 0.5
    //const zQuad = SIR.position[2]/10 + 0.5

    const dirVector = []
    for(var j=0; j<centerPoint.length; j++){
        dirVector.push(SIR.position[j]-centerPoint[j])
    }
    const xQuad = SIR.position[0] + 0.5 + (dirVector[0]*zoom)
    const yQuad = SIR.position[1] + 0.5 + (dirVector[1]*zoom)
    const zQuad = SIR.position[2] + 0.5 + (dirVector[2]*zoom)

    const axis = SIR.rotation.axis
    const degree = SIR.rotation.degree

    var groupID = i
    const tiles = buildTiles(SIR, groupID, updateClick, click).map((tile) => <>{tile}</>)

    //rotate group as specified in rotate & orientation fields
    var rotationArr;
    switch(axis){
        case 'x':
            rotationArr = [(Math.PI/2.0)*degree, 0, (Math.PI/2.0)*3]; break;
        case 'y':
            rotationArr = [0,(Math.PI/2.0) * degree, 0]; break;
        case 'z':
            rotationArr = [Math.PI/2.0, (Math.PI/2.0) * degree, 0]; break;
    }
    return (
        <group
            key = {groupID}
            rotation = {rotationArr}
            position = {[xQuad, yQuad, zQuad]}
        >
            {tiles}
        </group>
    )
}

function buildTiles(SIR, groupID, updateClick, click){

    // tile rendering information
    var tilePos;
    var tileGeometry;
    var tileColor;

    // position of white strips at the beginning/end of each quad
    var whitePos

    // some basic information about the quad in which the tiles lie
    const colors = SIR.structure.colors
    const size = colors.length

    var tiles = []

    for(var s=0; s<size; s++){
        var thk = 0.1
        //bottom tile
        if(s==0){
            tileColor = getColorHEX(colors[s])
            tilePos = [0,s - 0.5, 0]
            tileGeometry = [1-thk, thk, 1-thk]
            whitePos = [0,s - 0.5, 0.5]

        //top tile
        }else if(s+1==size){
            tileColor = getColorHEX(colors[s])
            tilePos = [0,s - 1.5, 0]
            tileGeometry = [1-thk, thk, 1-thk]
            whitePos = [0,s - 1.5, 0.5]

        //tiles in between
        }else{
            tileColor = getColorHEX(colors[s])
            tilePos = [0,s - 1, 0.5]
            tileGeometry = [1-thk, 1-thk, thk]
            whitePos = [0,s - 1.5, 0.5]
        }

        const thisID = groupID*(size+1) + s + size
        const tileID = 2 * thisID
        const whiteID = 2 * thisID + 1
        const tid = s

        function selectColor(sirID, tid, tileColor){
            if(click==null){return tileColor}

            switch(click.getType()){
                case 'quad':
                    switch(click.getID()==sirID){
                        case true:
                            return '#777777'
                        case false:
                            return tileColor
                    }
                case 'tile':
                    switch(click.getID()==sirID && click.getTID()==tid){
                        case true:
                            return '#777777'
                        case false:
                            return tileColor
                    }
            }
        }
        
        tiles.push(
            <mesh
                key = {tileID}
                position={tilePos}
                onClick={(event) => {
                    if(updateClick != null && click != null){
                        updateClick(new SO(SIR, groupID, tid, event.timeStamp, event.distance, click.getType()))
                    }
                }}
            >
                <meshStandardMaterial color={selectColor(groupID, tid, tileColor)}/>
                <boxGeometry args={tileGeometry}/>
            </mesh>
        )

        tiles.push(
            <mesh
                key = {whiteID}
                position={whitePos}>
                <meshStandardMaterial color='white'/>
                <boxGeometry args={[1-thk,thk,thk]}/>
            </mesh>
        )
    }

    return tiles
}