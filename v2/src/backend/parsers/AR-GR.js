
// translates a quads structure from its intermediate representation to its Graph Representation
// it uses the array of the array representation to built a graph

import {GR} from '../classes/GR.js'


export function ARtoGR(ar){
    var accVar = new GR(ar.size())
    var accFun = (accVar, idA, idB) => {
        return accVar.addEdge(idA, idB)
    }

    return ar.onTileMatch(accVar, accFun)
}
