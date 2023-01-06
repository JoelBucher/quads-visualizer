import { Row, Col, Button, Input } from "antd";
import { getColorHEX } from '../../../../../backend/visualizers/fibreHelper.js'
import { useState } from "react";
import { RetweetOutlined } from '@ant-design/icons';


export function EditColorSelector(props){
    const colStyle = {width: '40px', height: '40px'}
    const sir = props.so.getSIR()

    const [view, setView] = useState('button')

    const swapColors = () => {
        sir.swapColors()
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    const changeColors = (string) => {
        sir.setColors(string)
        props.so.setSIR(sir)
        props.updateSO(props.so)
    }

    // reverse button can only be used if 'button' view of quads colors is active.
    // Otherwise we have troubles with ant design input field which does not rerender "defaultValue" field
    function displaySwapColors(){
        if(view=='button'){
            return(
                <Button
                    style = {{width: '40px', height: '40px', marginLeft: 10}}
                    icon={<RetweetOutlined/>}
                    onClick = { swapColors }
                />
            )
        }else{
            return(<></>)
        }
    }

    return(
        <>
            <Button.Group>
                {displayView()}
                {displaySwapColors()}
                
            </Button.Group>
        </>
    )

    function displayView(){
        switch(view){
            case 'button':
                const buttonStyle = {margin: 0, padding: 0, borderRadius: '5px', height: '40px', border: 'none'}
                return(
                    <Button
                        style={buttonStyle}
                        onClick={() => {setView('search')}}
                    >
                        <Row style={{margin: 0, padding: 0, height: '100%'}}>
                            {colorSquares(sir)}
                        </Row>
                    </Button>
                )
            case 'search':
                return(
                    <>
                        <Input
                            defaultValue = {sir.getColorString()}
                            onPressEnter={(event) => {changeColors(event.target.value); setView('button')}}
                            onChange={ (event) => changeColors(event.target.value) }
                        />
                    </>
                )
        }
    }    
}


function colorSquares(sir){
    var res = []
    for(var i=0; i<sir.size(); i++){
        res.push(<Col style={styleManager(i,sir)} key={"colorSquare"+i}/>)
    }
    return res
}

function styleManager(i, sir){
    const borderRadius = '5px'
    const buttonWidth = 160
    const colorWidth = (buttonWidth/sir.size()) + 'px'

    const baseStyle     = {width: colorWidth, height: '40px', border: '1px solid white'}
    const firstStyle    = {borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius}
    const lastStyle     = {borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius}
    const colorStyle    = colorManager(i,sir)

    switch(i){
        case 0:
            return Object.assign(baseStyle, firstStyle, colorStyle)
        case sir.size()-1:
            return Object.assign(baseStyle, lastStyle, colorStyle)
        default:
            return Object.assign(baseStyle, colorStyle)
    }
}

function colorManager(i,sir){
    if(sir != null){
        return {backgroundColor: getColorHEX(sir.structure.colors[i])}
    }else{
        return {backgroundColor: getColorHEX('gray')}
    }
}