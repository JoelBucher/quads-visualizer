// name:        combinations One
// version:     1.1
// type:        brute-force
// objective:   given a structure, find a placement of quads that maximizes the score

import {IRtoAR} from '../parsers/IR-AR.js';
import {IR} from '../classes/IR.js';
import {booleanCombinations, permutator, choose} from './helper/combinatorics.js';

/*
const quadsSet = [
    ['r','y','b','g'],
    ['r','y','g','b'],
    ['r','b','y','g'],
    ['r','b','g','y'],
    ['r','g','y','b'],
    ['r','g','b','y'],
    ['y','r','b','g'],
    ['y','r','g','b'],
    ['y','b','r','g'],
    ['y','g','r','b'],
    ['b','r','y','g'],
    ['b','y','r','g'],
]
*/

export function combinationsOne(ir,game){
    var curMaxScore = 0
    var maxSet = new Array(0)

    //allow the algorithm to end early if it reaches globalMaxScore
    var globalMaxScore = getGlobalMaxScore(ir)


    // compute all possible groups of tiles that could be used to populate structure
    var groups = choose(game, ir.size())

    // all permutations of which quad to swap
    const swap = booleanCombinations(ir.size())

    var groupSize = groups.length;

    for(var g=0; g<groups.length; g++){
        //compute all permutations of a group
        var pGroup = permutator(groups[g])

        for(var k=0; k<pGroup.length; k++){
            var cGroup = pGroup[k]

            // we now have a permuted Group where every quad sits in its position
            // before we can check the structure, we need to add all swap permutations
        
            for(var s=0; s<swap.length; s++){
                var swapPattern = swap[s]

                var cGroupCopy = new Array(cGroup.length)
                for(var i=0; i<ir.size(); i++){

                    //execute swap
                    if(swapPattern[i]){
                        // make deep copy of array and reverse it
                        const reverse = JSON.parse(JSON.stringify(cGroup[i])).reverse();
                        cGroupCopy[i] = reverse
                    }else{
                        const copy = JSON.parse(JSON.stringify(cGroup[i]));
                        cGroupCopy[i] = copy
                    }
                }

                // at this point, all swaps are applied and we are left with a concrete
                // color assignment for all quads

                //generate IR
                for(var i=0; i<ir.size(); i++){
                    ir.get(i).structure.colors = cGroupCopy[i]
                }
                
                //convert to Abstract Representation (AR)
                const AR = IRtoAR(ir)

                //compute score of combination
                const score = AR.score()

                if(score == globalMaxScore){
                    return ir
                }else if(score > curMaxScore){
                    curMaxScore = score
                    const maxStructure = ir.clone()

                    maxSet = new Array(0)
                    maxSet.push(maxStructure)
                    
                }else if(score == curMaxScore){
                    const maxStructure = ir.clone()
        
                    maxSet.push(maxStructure)
                }
            }
        }
    }

    return maxSet
}

function getGlobalMaxScore(ir){
    var tiles = 0
    for(var i=0; i<ir.size(); i++){
        tiles += ir.get(i).structure.colors.length
    }
    return parseInt(tiles/2)
}
