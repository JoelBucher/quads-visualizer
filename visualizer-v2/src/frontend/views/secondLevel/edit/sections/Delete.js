import { Button } from "antd";


export function Delete(props){

    const deleteSIR = () => {
        const so = props.so
        so.setTag('remove')
        props.updateSO(so)
    }

    return(
        <Button
            style={{height: '40px', width: '100%', backgroundColor: '#EC6446', borderRadius: '10px', color: 'white', marginTop: 20}}
            onClick={deleteSIR}
            >
            Delete Quad
        </Button>
    )
}