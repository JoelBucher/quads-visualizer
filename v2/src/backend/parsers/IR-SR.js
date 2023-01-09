export function IRtoSR(ir){
    var SR = ""
    for(var j=0; j<ir.size(); j++){
        const pos = ir.get(j).position
        const axis = ir.get(j).rotation.axis
        const degree = ir.get(j).rotation.degree
        const colors = ir.get(j).structure.colors

        var cStr = ""
        if(colors[0] === "x"){
            cStr += colors.length - 2
        }else{
            for(var i=0; i<colors.length; i++){
                cStr += colors[i]
            }
        }
        
        var pStr = ""
        for(var i=0; i<pos.length; i++){
            if(i+1!=pos.length){
                pStr+=pos[i]+","
            }else{
                pStr+=pos[i]
            }
        }
        
        SR += '('+pStr+'/'+ axis + degree + '/' + cStr +')'
    }
    return SR
}