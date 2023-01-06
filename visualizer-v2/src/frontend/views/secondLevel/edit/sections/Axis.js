import { Radio } from "antd";

export function EditAxis(props){
    const sir = props.so.getSIR()

    const changeAxis = (axis) => {
        sir.rotation.axis = axis
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    return(
        <Radio.Group
        options={[
            {'label': 'X', 'value': 'x'},
            {'label': 'Y', 'value': 'y'},
            {'label': 'Z', 'value': 'z'}
        ]}
        value = {sir!=null ? sir.rotation.axis : 'x'}
        optionType="button"
        onChange={(obj) => {changeAxis(obj.target.value)}}
        />
    )
}