import { Slider } from "antd";

export function EditDegree(props){
    const sir = props.so.getSIR()

    const changeDegree = (degree) => {
        sir.rotation.degree = degree
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    //this function returns different marks for the slider element, depending on the axis of the quad
    function getMarks(){
        const axis = sir!=null ? sir.rotation.axis : 'x'
        
        switch(axis){
            case 'x':
                return {0: 'front', 1: 'down', 2: 'back', 3: 'up'}
            case 'y':
                return {0: 'front', 1: 'right', 2: 'back', 3: 'left'}
            case 'z':
                return {0: 'down', 1: 'right', 2: 'up', 3: 'left'}
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