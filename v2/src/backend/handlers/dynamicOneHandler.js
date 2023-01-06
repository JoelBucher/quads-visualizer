import {setup} from '../setup.js';
import {SRtoIR} from '../parsers/SR-IR.js';
import {dynamicOne } from '../algorithms/dynamicOne.js';
import {download, fileStringFromIR, readFile, SRsetsToIRsets} from '../file.js'


export function dynamicOneHandler(input){
    const sceneObject = setup()

    const ir = SRtoIR(input)

    const IRset = dynamicOne(ir)

    const fileString = fileStringFromIR(IRset, "dynamicOne", IRset[0])
    download("dynamicOne.txt", fileString)
}