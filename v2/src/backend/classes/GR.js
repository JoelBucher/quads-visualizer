import { ReplaceStencilOp } from "three"
import { IR } from "./IR.js"


export class GR{

    constructor(size, root = 0){
        this.nodes = new Array(0)
        this.edges = new Array(0)
        this.size = size
        this.root = root

        for(var i=0; i<size; i++){
            this.addNode(i)
            this.edges[i] = new Array(size)

            for(var j=0; j<size; j++){
                this.edges[i][j] = 0
            }
        }
    }

    addEdge(from, to){
        this.edges[from][to] = 1
        this.edges[to][from] = 1
        
        return this
    }

    addNode(id){
        const newNode = new Node(id)
        this.nodes.push(newNode)

        return this
    }

    size(){
        return this.length
    }

    getNode(id){
        return this.nodes[id]
    }

    maxScore(){
        return this.edges[this.root][this.root]/2
    }

    degree(id){
        // returns the sum of an array
        function sum(arr){
            return arr.reduce((a, b) => a + b, 0)
        }

        return sum(this.edges[id])
    }

    addNeighbours(id, res){
        for(var i=0; i<this.edges[id].length; i++){
            if(!res.includes(i) && this.edges[id][i]==1){
                res.push(i)
            }
        }
    }


    maxDegree(ids){
        var maxID = ids[0]
        var maxDeg = this.degree(ids[0])

        for(var i=1; i<ids.length; i++){
            var curDeg = this.degree(ids[i])

            if(curDeg > maxDeg){
                maxID = ids[i]
                maxDeg = curDeg
            }
        }
        return maxID
    }

    
    // calculate clever node traversing order for greedy algorithm
    order(){
        var notVisited = new Array()
        for(var i=0; i<this.size; i++){notVisited.push(i)}

        var res = new Array()

        while(notVisited.length > 0){
            var maxID = this.maxDegree(notVisited)
            res.push(maxID)
            this.addNeighbours(maxID, res)
            
            //update not visited array
            notVisited = notVisited.filter(x => !res.includes(x));

            console.log("--------")
            console.log(maxID)
            console.log(res)
            console.log(notVisited)
            console.log("--------")

            
        }

        return res
    }
    
}

class Node{
    constructor(id){
        this.id = id
    }

    getID(){
        return this.id
    }

    clone(){
        return new Node(this.id)
    }
}