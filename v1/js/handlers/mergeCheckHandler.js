import {download, fileStringFromIR, readFile, SRsetsToIRsets} from '../file.js'
import {mergeCheck} from '../algorithms/mergeCheck.js'

export async function mergeCheckHandler(){
    /*
    //compute sets
    const SRsetDouble = await readFile("double.txt")
    const SRsetSingle = await readFile("single.txt")

    const SRsets = new Array(SRsetDouble, SRsetSingle, SRsetDouble)
    const IRsets = SRsetsToIRsets(SRsets)

    //compute transformation rules
    const t1 = function(ir){return ir}
    const t2 = function(ir){return ir.translateZ(2)}
    const t3 = function(ir){return ir.translateZ(3).rotateZ(2).translatePosition(2,1,0)}

    const tRules = new Array(t1,t2,t3)

    const IRset = mergeCheck(IRsets, tRules)

    const fileString = fileStringFromIR(IRset, "mergeCheck", IRset[0])
    download("mergeCheck.txt", fileString)
    */

    /*
    const SRsetSix = await readFile("six.txt")

    const SRsets = new Array(SRsetSix, SRsetSix)
    */

    const SRsetFour = await readFile('four.txt')
    const SRsets = new Array(SRsetFour, SRsetFour, SRsetFour)

    const IRsets = SRsetsToIRsets(SRsets)

    /*
    const t1 = function(ir){return ir}
    const t2 = function(ir){return ir.rotateY(2).translateX(4).translateZ(6)}
    */

    const t1 = function(ir){return ir}
    const t2 = function(ir){return ir.translateZ(4)}
    const t3 = function(ir){return ir.translateZ(8)}

    //const tRules = new Array(t1,t2)
    const tRules = new Array(t1,t2,t3)

    const IRset = mergeCheck(IRsets, tRules)

    const fileString = fileStringFromIR(IRset, "mergeCheck", IRset[0])
    download("mergeCheck.txt", fileString)

}