import { useState } from 'react';
import {SearchView} from './frontend/views/firstLevel/SearchView.js'
import {WindowView} from './frontend/views/firstLevel/WindowView.js'
import {ButtonBar} from './frontend/views/firstLevel/ButtonBar.js'
import { IR } from './backend/classes/IR';

function App() {
  // window
  // 0 - search view is displayed (no window)
  // 1 - edit view
  // 2 - algorithms view
  // 3 - stats view
  
  const [window, setWindow] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [ir, setIR] = useState(new IR())

  function setWindowCallback(w){
    setWindow(w);
  }

  function setZoomCallback(z){
    setZoom(z);
  }

  function setIRCallback(ir){
    setIR(ir)
  }

  function getWindow(w){
    switch(w){
        case 0:
          return(
          <SearchView
            ir = {ir}
            setIR = {setIRCallback}
            zoom = {zoom}
          />)
        default:
          return(
          <WindowView
            getWindow = {() => this.getWindowCallback()}
            window = {w}
            ir = {ir}
            setIR = {setIRCallback}
            zoom = {zoom}
          />)
    }
    
  }

  return (
    <>
    {getWindow(window)}
    <ButtonBar
      setWindow = {(w) => setWindowCallback(w)}
      setZoom = {(z) => setZoomCallback(z)}
    />
    </>
  );
}

export default App;
