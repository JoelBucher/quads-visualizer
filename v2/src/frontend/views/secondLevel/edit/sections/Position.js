import { InputNumber, Input } from "antd";

export function EditPosition(props){
    const sir = props.so.getSIR()

    const changePosition = (pos, i) => {
        sir.position[i] = pos
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    return(
        <Input.Group>
            <InputNumber
                    style={{width: '33%'}}
                    min={0}
                    value={sir!=null ? sir.position[0] : 0}
                    onChange={(value) => {changePosition(value,0)}}
            />
            <InputNumber
                    style={{width: '33%'}}
                    min={0}
                    value={sir!=null ? sir.position[1] : 0}
                    onChange={(value) => {changePosition(value,1)}}
            />
            <InputNumber
                    style={{width: '33%'}}
                    min={0}
                    value={sir!=null ? sir.position[2] : 0}
                    onChange={(value) => {changePosition(value,2)}}
            />
        </Input.Group>
    )
}