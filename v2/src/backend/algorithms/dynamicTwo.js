// name:        dynamic Two
// version:     1.0 initial version
// objective:   given a structure in intermediate Representation, find a placement of quads that maximizes the score

import { combinationsOne } from "./combinationsOne.js"
import { ARtoGR } from "../parsers/AR-GR.js"
import { IRtoAR } from "../parsers/IR-AR.js"
import { IR } from "../classes/IR.js"
import { IRtoSR } from "../parsers/IR-SR.js"

export function dynamicTwo(ir, game, k=0){

    var count = 0
    var total = (k+1)*ir.size()
    
    // clean ir of all associated colors (this step ensures theoretical-max-score works correctly)
    ir = ir.removeColors();


    var gr = ARtoGR(IRtoAR(ir))

    // We sequentially add quads to a substructure of ir until we arrive at ir.
    // This substructure needs to be cohesive, therefore we need to run dfs on gr first
    const order = gr.order()

    // define dp table (holding IRsets of possible colourings)
    var dp = new Array(ir.size())
    for(var i=0; i<dp.length; i++){
        dp[i] = new Array(k+1)
    }

    //basecase (SIR)
    var structure = new IR()
    structure.add(ir.get(order[0]).clone())

    dp[0][0] = combinationsOne(structure.clone(),game)

    for(var i=1; i<ir.size(); i++){
        const newSIR = ir.get(order[i]).clone()
        const newIR = new IR()
        newIR.add(newSIR)

        const colouredNewIRset = combinationsOne(newIR,game)

        // extend structure by current newSIR
        structure.add(newSIR)

        // theoretical max-score
        const maxScore = IRtoAR(structure).score()

        // variable f denotes the number of faults possible
        for(var f=0; f<=k; f++){
            count++;

            const IRset = dp[i-1][f]

            if(IRset != undefined){

                for(var l=0; l<IRset.length; l++){

                    const colouredOldIR = IRset[l]

                    for(var j=0; j<colouredNewIRset.length; j++){
                        
                        const colouredNewIR = colouredNewIRset[j]

                        // merge step
                        var mergedIR = new IR()
                        mergedIR = mergedIR.merge(colouredNewIR)
                        mergedIR = mergedIR.merge(colouredOldIR)
                        
                        if(mergedIR.uniqueQuads()){
                            const mergedScore = IRtoAR(mergedIR).score()

                            // add merged Object to respective dp-class
                            const numberOfFaults =  maxScore - mergedScore

                            if(numberOfFaults <= k){

                                if(dp[i][numberOfFaults] == undefined){
                                    dp[i][numberOfFaults] = new Array(mergedIR)
                                }else{
                                    dp[i][numberOfFaults].push(mergedIR)
                                }
                            }
                        }
                    }
                }
            }
            console.log("progress: "+(count/total))
        }
    }

    //return best result (the one with the least errors)
    for(var i=0; i<=k; i++){
        const res = dp[ir.size()-1][i]
        if(res != undefined){
            return res
        }
    }

    console.error("no solution with given error budget found")
    return null
}