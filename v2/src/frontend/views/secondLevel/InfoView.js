import { Input, Segmented } from 'antd';
import { useState } from 'react';
import { IRtoAR } from '../../../backend/parsers/IR-AR.js';
import { IRtoSR } from '../../../backend/parsers/IR-SR.js'

export function InfoView(props){
    const [window, setWindow] = useState('compliance')

    function segmentedContent(){
        switch(window){
            case 'compliance':
                var unique;
                if(props.ir.uniqueQuads()){
                    unique = "yes"
                }else{
                    unique = "no"
                }

                return (
                <>
                    <h3 style={{marginTop: 10}}>Color Score: {props.ir.colorScore()}</h3>
                    <h3 style={{marginTop: 10}}>Theoretical Score: {IRtoAR(props.ir.clone().removeColors()).score()}</h3>
                    <h3 style={{marginTop: 10}}>Structure Size: {props.ir.size()}</h3>
                    <h3 style={{marginTop: 10}}>Valid Coloring: {unique}</h3>
                </>)
            case 'exports':
                return(
                    <>
                    <h3 style={{marginTop: 20}}>String Representation (SR)</h3>
                    <Input 
                        value = {IRtoSR(props.ir)}
                    />
                    </>
                )
        }
    }
    return(
    <>
        <h2>Overview</h2>
        <Segmented
            block
            options={[
                { label: 'Compliance', value: 'compliance' },
                { label: 'Exports', value: 'exports' }]}
            onChange={(value) => {setWindow(value);}}>
        </Segmented>
        {segmentedContent()}
    </>
    )
}