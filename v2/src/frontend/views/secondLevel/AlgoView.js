import { Button, InputNumber, Col, Row, Popover, Spin } from 'antd';
import { AppstoreOutlined, BuildOutlined, InfoCircleOutlined, WarningOutlined, DashboardOutlined } from '@ant-design/icons';
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
    const [error, setError] = useState(null)
    const [info, setInfo] = useState(null)

    const buttonStyle = {width: "100%", height: 40, border: "1px solid black", margin: 5, textAlign: "left"}

    const t = props.ir.dominoSize()
    const colors = supportedColors.slice(0, t);
    const game = symmetricPermutator(colors)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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
                        <>
                        <Col span={24/colors.length}>
                            <div style={{backgroundColor: getColorHEX(elem), width: "30px", height: "30px", margin: "2px",borderRadius: "5px", }}/>
                       </Col>
                       </>
                    )}
                </Row>      
                </>
            )
        }
    }
    /*
    Brute-Force Button
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
    */
   function subtitle(title,content){
    return(
        <Row>
            <Col>
                <h3>{title}</h3>
            </Col>
            <Col>
                <div style={{margin: "3px", marginLeft: "10px"}}>
                <Popover content={content} title="Game Colors">
                    <InfoCircleOutlined/>
                </Popover>
                </div>
            </Col>
        </Row>
        )
   }

   function displayError(){
    if(error == null){
        return(<></>)
    }else{
        return(
            <>
            <Row>
                <Col span={4}>
                    <WarningOutlined/>
                </Col>
                <Col span={20}>
                    {error}
                </Col>
            </Row>
            </>
        )}
   }

   function displayInfo(){
    if(info == null){
        return(<></>)
    }else{
        return(
            <>
            <Row>
                <Col span={4}>
                    <Spin></Spin>
                </Col>
                <Col span={20}>
                    {info}
                </Col>
            </Row>
            </>
        )}
   }

    return(
        <>  
            <h2>Algorithms</h2>
            {subtitle("Game", "Your structure will be colored using these colors.")}
            
            { gameSelection() }

            {subtitle("Score Maximization", "All algorithms below search a score maximizing coloring for your given structure.")}        
            
            <Button
                            style={buttonStyle}
                            icon={<BuildOutlined/>}
                            size={"large"}
                            onClick = {async () => {
                                setInfo("Computing Colorings...");
                                setError(null);
                                await sleep(100);

                                const maxIRset = dynamicOne(props.ir,game);
                                if(maxIRset != null){
                                    const fileString = fileStringFromIR(maxIRset, "Greedy", props.ir)
                                    download("result.txt",fileString);
                                }else{
                                    setError("Greedy could not find any valid colorings.")
                                }
                                setInfo(null)
                                }}>
                                Greedy
            </Button>
            <Button
                            style={buttonStyle}
                            icon={<BuildOutlined/>}
                            size={"large"}
                            onClick = {async () => {
                                setError(null)
                                setInfo("Computing Colorings...");
                                await sleep(100);

                                const maxIRset = dynamicTwo(props.ir,game,k);
                                if(maxIRset != null){
                                    const fileString = fileStringFromIR(maxIRset, "Fault Budget", props.ir)
                                    download("result.txt",fileString);
                                }else{
                                    setError("There does not exist a valid coloring given a fault budget k<="+k+".")
                                }
                                setInfo(null)
                                }}>
                                Fault Budget
                                
            </Button>
            <Row>
                <Col>
                    <div style={{marginTop: "5px", marginRight: "10px"}}>
                        <p>Budget (k):</p>
                    </div>
                </Col>
                <Col>
                    <InputNumber
                    min={0}
                    defaultValue={0}
                    onChange={(value) => setK(value)}
                />
                </Col>
            </Row>
            {displayInfo()}
            {displayError()}
        </>
    )
} 