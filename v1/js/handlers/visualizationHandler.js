import {setup} from '../setup.js';
import {buildFromAR} from '../visualizers/buildFromAR.js';
import {SRtoIR} from '../parsers/SR-IR.js';
import {IRtoAR} from '../parsers/IR-AR.js';

export function visualizationHandler(input){
    const sceneObject = setup()

    var IR = SRtoIR(input)

    const AR = IRtoAR(IR);
    
    buildFromAR(AR,sceneObject.scene);

}