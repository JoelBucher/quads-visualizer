import { Segmented, Row, Col, Empty } from "antd";
import { useState } from "react";
import { AimOutlined, UndoOutlined, DragOutlined, BgColorsOutlined } from '@ant-design/icons';
import { EditColorSelector } from "./sections/Color";
import { EditDegree } from "./sections/Degree";
import { EditAxis } from "./sections/Axis";
import { EditPosition } from "./sections/Position";
import { Delete } from "./sections/Delete";
import { AddView } from "./add/AddView";

export function EditView(props){
    const [window, setWindow] = useState('quad')

    // short hand for currently selected quad
    const sir = props.so.getSIR()

    function sectionTitle(icon, title){
        return(
            <Row gutter={10} style={{marginTop: 20}}>
                <Col>
                    <div style={{fontSize: 20}}>
                        {icon}
                    </div>
                </Col>
                <Col>
                    <h3>{title}</h3>
                </Col>
            </Row>
        )
    }

    function segmentedContent(){
        switch(window){
            // edit Quad
            case 'quad':
                return(
                    <>
                    {sectionTitle(<AimOutlined/>, "Position")}
                    <EditPosition
                        so={props.so}
                        updateSO = {props.updateSO}
                    />


                    {sectionTitle(<DragOutlined/>, "Axis")}
                    <EditAxis 
                        so={props.so}
                        updateSO = {props.updateSO}
                    />
                    
                    {sectionTitle(<UndoOutlined/>, "Degree")}
                    <EditDegree
                        so={props.so}
                        updateSO = {props.updateSO}
                    />

                    {sectionTitle(<BgColorsOutlined/>, "Color")}
                    <EditColorSelector
                        so={props.so}
                        updateSO = {props.updateSO}
                    />

                    <Delete
                        so = {props.so}
                        updateSO = {props.updateSO}
                    />
                    </>
                )

            // add Quad
            case 'tile':
                return(
                    <AddView
                        so = {props.so}
                        updateSO = {props.updateSO}
                        ir = {props.ir}
                    />
                )
        }
    }

    function empty(){
        return(
            <Empty
                style = {{marginTop: 40}}
                description={
                <span>
                    Select a Quad of your Structure
                </span>
                }
            />
        )
    }

    return(
    <>
        <h2>Edit Structure</h2>
        <Segmented
            block
            options={[
                { label: 'Edit Quad', value: 'quad' },
                { label: 'Add Quad', value: 'tile' }]}
            onChange={(value) => {setWindow(value); props.updateSO(props.so.setType(value))}}>
        </Segmented>
        {sir!=null || window=='tile' ? segmentedContent() : empty()}
    </>
    )
}