import { Divider, Button, Progress, Input, InputNumber, Grid, Col, Row } from 'antd';
import { AppstoreOutlined, BuildOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { dynamicOne } from '../../../backend/algorithms/dynamicOne.js'
import { dynamicTwo } from '../../../backend/algorithms/dynamicTwo.js'
import { combinationsOne } from '../../../backend/algorithms/combinationsOne.js'
import { supportedColors, getColorHEX } from '../../../backend/visualizers/fibreHelper.js'
import { permutator, symmetricPermutator } from '../../../backend/algorithms/helper/combinatorics.js'
import {SA} from '../../classes/SA.js'

import { download, fileStringFromIR } from '../../../backend/file.js';


//add mergeCheck
// import { BuildOutlined } from '@ant-design/icons';
// <Button style={{width: "100%", height: 40, border: "1px solid black", margin: 5, textAlign: "left"}} icon={<BlockOutlined/>} size={"large"}>MergeCheck</Button>

export function AlgoView(props){

    const [k, setK] = useState(0)

    const buttonStyle = {width: "100%", height: 40, border: "1px solid black", margin: 5, textAlign: "left"}

    const t = props.ir.dominoSize()
    const colors = supportedColors.slice(0, t);
    const game = symmetricPermutator(colors)

    function gameSelection(){
        if(t == -1){
            return(
                <>
                    <p>All dominoes must have the same length!</p>
                </>
            )
        }else if(t > supportedColors.length){
            return(
                <>
                    <p>The size of your dominoes exceeds the number of supported colors. (color limit is {supportedColors.length})</p>
                </>
            )
        }else{
            return(
                <>
                <Row>
                    {colors.map((elem) =>
                       <Col span={24/colors.length}>
                            <div style={{backgroundColor: getColorHEX(elem), width: "30px", height: "30px", margin: "2px",borderRadius: "5px", }}/>
                       </Col>
                    )}
                </Row>      
                </>
            )
        }
    }

    return(
        <>  
            <h2>Algorithms</h2>
            <h3>Game</h3>
            { gameSelection() }

            <h3>Structure Fitting</h3>
            <Button
                            style={buttonStyle}
                            icon={<AppstoreOutlined/>}
                            size={"large"}
                            onClick = {() => {
                                const maxIRset = combinationsOne(props.ir,game);
                                const fileString = fileStringFromIR(maxIRset, "Brute Force", props.ir)
                                download("result.txt",fileString);
                                }}>
                                Brute Force
            </Button>
            <Button
                            style={buttonStyle}
                            icon={<BuildOutlined/>}
                            size={"large"}
                            onClick = {() => {
                                const maxIRset = dynamicOne(props.ir,game);
                                const fileString = fileStringFromIR(maxIRset, "Greedy", props.ir)
                                download("result.txt",fileString);
                                }}>
                                Greedy
            </Button>
            <Button
                            style={buttonStyle}
                            icon={<BuildOutlined/>}
                            size={"large"}
                            onClick = {() => {
                                const maxIRset = dynamicTwo(props.ir,game,k);
                                const fileString = fileStringFromIR(maxIRset, "Fault Budget", props.ir)
                                download("result.txt",fileString);
                                }}>
                                Fault Budget
                                
            </Button>
            <InputNumber
                min={0}
                defaultValue={0}
                onChange={(value) => setK(value)}
            />
        </>
    )
} 