//colors are defined in constants.js

import * as constants from './constants.js'

export function getColor(s){
    if(s=='r'){
        return constants.red
    }else if(s=='g'){
        return constants.green
    }else if(s=='b'){
        return constants.blue
    }else if(s=='y'){
        return constants.yellow
    }else{
        return constants.gray
    }
}