
export class GR{

    constructor(length){
        this.nodes = new Array(0)
        this.length = length

        for(var i=0; i<length; i++){
            this.addNode(i)
        }
    }

    addEdge(from, to){
        const toNode = this.getNode(to)
        this.nodes[from].addNeighbour(toNode)

        return this
    }

    size(){
        return this.length
    }


    addNode(id){
        const newNode = new Node(id)
        this.nodes.push(newNode)

        return this
    }

    getNode(id){
        return this.nodes[id]
    }

    getNeighbours(){
        var res = new Set()
        for(var i=0; i<this.size(); i++){
            const node = this.getNode(i)
            const nodeNeighbours = node.getNeighbours()

            for(var j=0; j<nodeNeighbours.length; j++){
                const cur = nodeNeighbours.get(j)
                if(!(cur in this.nodes)){
                    res.add(cur)
                }
            }
        }
        return res
    }

    // returns a breath first search array containing node id's
    bfs(){
        var res = new Array()
        var visited = new Set()

        return bfsNode(this.getNode(0), visited, res)

        function bfsNode(node,visited,res){
            if(!visited.has(node.getID())){
                const ngb = node.getNeighbours()

                // mark nodes as visited
                visited.add(node.getID())
                res.push(node.getID())

                // recursive step
                ngb.forEach(n => {
                    bfsNode(n, visited, res)
                })
            }

            return res
        }

    }
}

class Node{
    constructor(id){
        this.id = id
        this.neighbours = new Set()
    }

    getID(){
        return this.id
    }

    addNeighbour(node){
        this.neighbours.add(node)
    }

    getNeighbours(){
        return this.neighbours
    }
    


}