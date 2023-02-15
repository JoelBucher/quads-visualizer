import { Slider } from "antd";

export function EditDegree(props){
    const sir = props.so.getSIR()

    const changeDegree = (degree) => {
        sir.rotation.degree = degree.toString()
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    //this function returns different marks for the slider element, depending on the axis of the quad
    function getMarks(){
        const axis = sir!=null ? sir.rotation.axis : 'x'
        
        switch(axis){
            case 'x':
                return {0: 'up', 1: 'front', 2: 'down', 3: 'back'}
            case 'y':
                return {0: 'left', 1: 'front', 2: 'right', 3: 'back'}
            case 'z':
                return {0: 'up', 1: 'left', 2: 'down', 3: 'right'}
        }
    }


    return(
        <Slider
            marks = {getMarks()}
            value = {sir!=null ? sir.rotation.degree : 0}
            onChange={(value) => {changeDegree(value)}}
            max = {3}
            min = {0}
        />
    )
}