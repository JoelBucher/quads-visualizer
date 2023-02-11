import {SRtoIR} from '../parsers/SR-IR.js';
import {combinationsOne } from '../algorithms/combinationsOne.js';
import {download, fileStringFromIR} from '../file.js'

export function combinationsOneHandler(input){
    const ir = SRtoIR(input);
    
    const optIRSet = combinationsOne(ir)

    const fileString = fileStringFromIR(optIRSet, "combinationOne", ir)
    download("result.txt",fileString);
}