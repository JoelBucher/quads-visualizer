import { Button } from "antd"
import { SIR } from "../../../../../backend/classes/SIR"


export function AddView(props){
    const ir = props.ir
    const buttonStyle = {height: '40px', width: '100%', backgroundColor: '#4295e3', borderRadius: '10px', color: 'white', marginTop: 20}

    const addSIR = (isRoot) => {
        const so = props.so

        if(isRoot){
            so.setSIR(new SIR())
        }else{
            const sir = so.getSIR().clone()
            const pos = sir.getTilePosition(so.getTID())
            sir.setPosition(pos)
            so.setSIR(sir)
        }
        so.setTag('add')
        props.updateSO(so)
    }

    function addQuadButton(){
        return(
            <>
            <Button
            style={buttonStyle}
            onClick={() => addSIR(false)}
            >
                Add Quad
            </Button>
            </>
        )
    }

    function rootQuadButton(){
        return(
            <>
            <Button
            style={buttonStyle}
            onClick={() => addSIR(true)}
            >
                Add First Quad
            </Button>
            </>
        )
    }

    return(
        <>
        {ir.size()==0 ? rootQuadButton() : <></>}
        {ir.size()>0 ? addQuadButton() : <></>}
        </>
    )
}