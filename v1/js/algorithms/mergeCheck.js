// name:        mergeCheck
// version:     1.0
// type:        brute-force
// objective:   given a set of IR's with corresponding (position,rotation)-translations,
//              produce a valid merged IR that maximizes the score value.


// example transformer
// const t2 = function(ir){return ir.translateZ(2)}


import { IR } from '../classes/IR.js';
import { IRtoAR } from '../parsers/IR-AR.js';

export function mergeCheck(IRsets, printProgress = true, IRtransformers = getDefaultTransformer(IRsets.length)){
    var maxScore = 0
    var maxSet = new Array(0)

    const sizes = Array(0)
    sizes.push(IRsets[0].length)

    for(var i=1; i<IRsets.length; i++){
        const s = sizes[i-1]*IRsets[i].length
        sizes.push(s)
    }

    
    for(var i=0; i<sizes[sizes.length-1]; i++){

        // compute all combinations of IR's from different IR sets
        const combination = Array(IRsets.length)

        combination[0] = IRsets[0][i%sizes[0]]
        for(var j=1; j<IRsets.length; j++){
            const index = parseInt(i/sizes[j-1])%IRsets[j].length
            combination[j] = IRsets[j][index]
        }

        // merge IR's that are in the same combination
        var merged = new IR()
        for(var c=0; c<combination.length; c++){
            // transform IR 
            const IRcopy = combination[c].clone()
            const transformedIR = IRtransformers[c](IRcopy)

            // merge the resulting IR with the rest
            merged = merged.merge(transformedIR)
        }

        // check if different IR's are compatible (i.e. does every quad only appear once?)
        if(merged.uniqueQuads()){
            //calculate score of the IR
            const AR = IRtoAR(merged)
            const score = AR.score()

            if(score > maxScore){
                maxScore = score

                maxSet = new Array(0)
                maxSet.push(merged)

            }else if(score==maxScore){
                maxSet.push(merged)
            }
        }

        if(printProgress && (i%1000)==0){
            console.log(Math.round((i/sizes[sizes.length-1])*100)/100)
        }
    }

    return maxSet
}

function getDefaultTransformer(size){
    var transformer = new Array(size)
    for(var s=0; s<size; s++){
        transformer[s] = function(ir){return ir}
    }
    return transformer
}


