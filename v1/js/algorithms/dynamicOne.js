// name:        dynamic One
// version:     1.0
// type:        DP
// objective:   given a structure in Graph Representation, find a placement of quads that maximizes the score

import { combinationsOne } from "./combinationsOne.js"
import { ARtoGR } from "../parsers/AR-GR.js"
import { IRtoAR } from "../parsers/IR-AR.js"
import { IR } from "../classes/IR.js"
import { mergeCheck } from "./mergeCheck.js"

export function dynamicOne(ir, printProgress = false){
    const gr = ARtoGR(IRtoAR(ir))

    // We sequentially add quads to a substructure of ir until we arrive at ir.
    // This substructure needs to be cohesive, therefore we need to run bfs on gr first
    const order = gr.bfs()
    console.log(order)

    // define dp table (holding IRsets of possible colourings)
    var dp = new Array(ir.size())

    //basecase (SIR)
    var structure = new IR()
    structure.add(ir.get(0))
    dp[0] = combinationsOne(structure,false)

    console.log("size "+order.length)

    for(var i=1; i<order.length; i++){
        const newSIR = ir.get(order[i])
        const newIR = new IR()
        newIR.add(newSIR)

        // colour new structure by merging previously computed IRsets

        //const IRsets = new Array(dp[i-1], changePosition(dp[0], newSIR))

        const IRsets = new Array(dp[i-1], combinationsOne(newIR,false))
        dp[i] = mergeCheck(IRsets,false)

        // extend structure by current newSIR
        structure.add(newSIR)

        if(printProgress){
            console.log(i/order.length)
        }
    }

    /*
    function changePosition(IRset, sir){

        var translatedIRset = new Array(IRset.length)
        for(var i=0; i<IRset.length; i++){
            var tIR = IRset[i].clone()
            const tSIR = tIR.get(0)
            
            const pos = sir.position
            tSIR.translatePosition(pos[0], pos[1], pos[2])
            tSIR.rotation.degree = sir.rotation.degree
            tSIR.rotation.axis   = sir.rotation.axis

            translatedIRset[i] = tIR
        }
        
        return translatedIRset
    }
    */

    return dp[order.length-1]
}