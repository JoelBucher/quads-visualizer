
// translates a quads structure from its intermediate representation to its Graph Representation
// it uses the array of the array representation to built a graph

import {GR} from '../classes/GR.js'


export function ARtoGR(ar){
    const fun = function(idA, idB, counter){ 
        counter = counter['value'].addEdge(idA,idB)
    }
    const obj = {'value': new GR(ar.size())}
    const graph = ar.onTileMatch(fun,obj)['value']

    return graph
}
