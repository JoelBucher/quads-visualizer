import { Input, Row, Col, Card} from 'antd';
import {useEffect, useState } from 'react'
import 'antd/dist/antd.min.css'
import QuadsScene from './QuadsScene';
import { EditView } from '../secondLevel/edit/EditView';
import { InfoView } from '../secondLevel/InfoView';
import { AlgoView } from '../secondLevel/AlgoView';
import { SO } from '../../classes/SO.js'

export function WindowView(props){
    const { Search } = Input;
    
    // holds selected Object (quad or tile)
    const [so, setSO] = useState(new SO())


    function updateSO(so){
        var ir = props.ir.clone()

        switch(so.getTag()){
            case 'select':

                // update overlying IR of whole structure
                ir.set(so.getSIR(), so.getID())

                // update selected object
                setSO(so)
                break;
            
            case 'remove':
                ir.remove(so.getID())

                setSO(new SO())
                break;
            
            case 'add':
                ir.add(so.getSIR())

                setSO(new SO())
                break;
        }
        props.setIR(ir)
    }

    function coloredIR(){
        const ir = props.ir.clone()
        switch(props.window){
            case 1:
                return(ir)
            case 2:
                return(ir.removeColors())
            case 3:
                return(ir)
        }
    }

    function selectWindow(){
        switch(props.window){
            case 1:
                return(<EditView
                    so = {so}
                    updateSO = {updateSO}
                    ir = {coloredIR()}
                />)
            case 2:
                return(<AlgoView ir = {coloredIR()}/>)
            default:
                return(<InfoView ir= {coloredIR()}/>)
        }
    }

    

    return (
    <>
        <Row>
            <Col span={1}/>
            <Col span={15}>
                <QuadsScene
                    ir = {coloredIR()}
                    so = {so}
                    updateSO = {updateSO}
                    zoom = {props.zoom}
                    />
                    
            </Col>
            <Col span={7}>
                <Card style={{marginTop: 20}}>
                    {selectWindow()}
                </Card>
            </Col>
            <Col span={1}/>
        </Row>
    </>
    )
}