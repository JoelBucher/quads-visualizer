import React, { useEffect } from "react";
import { useRef, useState } from 'react'
import { Canvas, useThree, useFrame, gridHelper } from '@react-three/fiber'
import { fibreBuildFromIR } from '../../../backend/visualizers/fibreBuildFromIR.js'
import { fibreBuildFromAR } from '../../../backend/visualizers/fibreBuildFromAR.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SO } from "../../classes/SO.js";
import { IRtoAR } from "../../../backend/parsers/IR-AR.js";

export default function QuadsScene(props) {
    // use non-state variable to keep track of click updates
    var c = new SO()
    const fibreList = fibreBuildFromIR(props.ir, updateClick, props.so, props.zoom)

    /*
    var ar = IRtoAR(props.ir)
    var fibreList = fibreBuildFromAR(ar)
    console.log("score "+ar.score())
    */
    

    function updateClick(so){
      // We can't use the state variable click instead of c, because it does not instantly update
      // which would break the functionality of updateClick()

      // if click was performed later, or the distance between camera and tile is smaller, then update click
      if(so.getTimeStamp() > c.getTimeStamp() || so.getDistance() < c.getDistance()){
        c = so
        props.updateSO(so)
      }
    }

    return(
        <div style={{height: "500px"}}>
            <Canvas>
                <CameraController />
                <perspectiveCamera 
                    fov = {75}
                    near = {0.1}
                    far = {1000}
                    position = {[0,0,5]}>
                        <directionalLight position = {[0.0, 5.0, 5.0]}/>
                    </perspectiveCamera>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <gridHelper/>
                {fibreList.map((quad) => <>{quad}</>)}
            </Canvas>
        </div>
        );
}


//define CameraController which lets user drag structure around
const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
};

