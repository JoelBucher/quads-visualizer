import { Button } from "antd"
import { SIR } from "../../../../../backend/classes/SIR"
import { SO } from "../../../../../frontend/classes/SO"

export function AddView(props){
    const buttonStyle = {height: '40px', width: '100%', backgroundColor: '#4295e3', borderRadius: '10px', color: 'white', marginTop: 20}

    const addSIR = () => {
        //const so = props.so
        
        var pos = [0,0,0]
    
        var positionExists = true

        while(positionExists){
            positionExists = false
            pos = [pos[0]+1, pos[1]+1, pos[2]+1]

            for(var i=0; i<props.ir.size(); i++){
                var domPos = props.ir.get(i).position
                if(domPos[0] == pos[0] && domPos[1] == pos[1] && domPos[2] == pos[2]){

                    positionExists = true
                }
            }
        }

        var newSIR = new SIR()
        newSIR.position = pos

        var so = new SO()
        so.setSIR(newSIR)
        so.setTag('add')
        props.updateSO(so)
    }

    function addQuadButton(){
        return(
            <>
            <Button
            style={buttonStyle}
            onClick={() => addSIR()}
            >
                Add Domino
            </Button>
            </>
        )
    }

    return(
        <>
        {addQuadButton()}
        </>
    )
}