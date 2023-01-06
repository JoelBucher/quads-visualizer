import {SRNtoIRN} from './parsers/SRN-IRN.js';
import { buildFromIRN } from './visualizers/buildFromIRN.js';
import {setup} from './setup.js';

export function custom(input){
    const sceneObject = setup()

    const irn = SRNtoIRN(input)
    console.log(irn.get(0).getTilePosition(0))
    console.log(irn.get(0).getTilePosition(1))
    console.log(irn.get(0).getTilePosition(2))
    console.log(irn.get(0).getTilePosition(3))
    buildFromIRN(irn, sceneObject.scene)
}