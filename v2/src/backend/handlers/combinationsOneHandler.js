import {SRtoIR} from '../parsers/SR-IR.js';
import {combinationsOne } from '../algorithms/combinationsOne.js';
import {download, fileStringFromIR} from '../file.js'

export function combinationsOneHandler(input){
    const ir = SRtoIR(input);
    
    const maxIRSet = combinationsOne(ir)

    const fileString = fileStringFromIR(maxIRSet, "combinationOne", ir)
    download("result.txt",fileString);
}