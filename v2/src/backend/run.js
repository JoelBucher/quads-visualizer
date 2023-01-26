import {SRNtoIRN} from './parsers/SRN-IRN.js';
import { buildFromIRN } from './visualizers/buildFromIRN.js';
import {setup} from './setup.js';

export function custom(input){
    const sceneObject = setup()

    const irn = SRNtoIRN(input)
    buildFromIRN(irn, sceneObject.scene)
}