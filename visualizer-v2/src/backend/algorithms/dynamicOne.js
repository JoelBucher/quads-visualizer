// name:        dynamic One
// version:     1.1 added simple backtracking
//              1.0 initial version
// objective:   given a structure in intermediate Representation, find a placement of quads that maximizes the score

import { combinationsOne } from "./combinationsOne.js"
import { ARtoGR } from "../parsers/AR-GR.js"
import { IRtoAR } from "../parsers/IR-AR.js"
import { IR } from "../classes/IR.js"
import { mergeCheck } from "./mergeCheck.js"
import { IRtoSR } from "../parsers/IR-SR.js"

export function dynamicOne(ir, game, progressCallback=null){
    console.log("is called")
    var gr = ARtoGR(IRtoAR(ir))

    // We sequentially add quads to a substructure of ir until we arrive at ir.
    // This substructure needs to be cohesive, therefore we need to run bfs on gr first
    const order = gr.order()
    //const order = new Array(0, 1, 4, 3, 8, 11, 9, 10, 7, 6, 5, 2)
    console.log(order)


    // define dp table (holding IRsets of possible colourings)
    var dp = new Array(ir.size())


    //basecase (SIR)
    var structure = new IR()
    structure.add(ir.get(order[0]))
    dp[0] = combinationsOne(structure,game)

    console.log("size "+ir.size())

    for(var i=1; i<ir.size(); i++){
        const newSIR = ir.get(order[i])
        const newIR = new IR()
        newIR.add(newSIR)

        const IRsets = new Array(dp[i-1], combinationsOne(newIR,game))
        const mergeResult = mergeCheck(IRsets)
 
        dp[i] = mergeResult

        // extend structure by current newSIR
        structure.add(newSIR)
    }

    return dp[ir.size()-1]
}