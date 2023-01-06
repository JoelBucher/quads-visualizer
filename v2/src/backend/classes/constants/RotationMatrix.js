
//functions to manipulate degrees
const f1 = function(x){return (x+1)%4}
const f2 = function(x){return x}
const f3 = function(x){if(x==2){return 0}else if(x==0){return 2}else{return x}}

// functions to manipulate positions
const p1 = function(x,y,z){return [x,-z-2, y]}
const p2 = function(x,y,z){return [x,-z-1,y]}

const p3 = function(x,y,z){return [z,y,-x-2]}
const p4 = function(x,y,z){return [z,y,-x-1]}

const p5 = function(x,y,z){return [-y-2,x,z]}
const p6 = function(x,y,z){return [-y-1,x,z]}

// Rotation Matrices per axis
// (contain information about new quad positions, orientation axis and degree adjustments)
const matrixX = new Array(
    {axis: 'x', swap: false, degFun: f1, posFun: p2},
    {axis: 'z', swap: false, degFun: f2, posFun: p2},
    {axis: 'y', swap: true,  degFun: f3, posFun: p1});

const matrixY = new Array(
    {axis: 'z', swap: true, degFun: f1, posFun: p3},
    {axis: 'y', swap: false, degFun: f1, posFun: p4},
    {axis: 'x', swap: false,  degFun: f1, posFun: p4});

const matrixZ = new Array(
    {axis: 'y', swap: false, degFun: f2, posFun: p6},
    {axis: 'x', swap: true, degFun: f2, posFun: p5},
    {axis: 'z', swap: false,  degFun: f1, posFun: p6});

// Complete Rotation Matrix
export const matrix = Array(matrixX, matrixY, matrixZ)