export const redHEX     = '#ff0000'
export const yellowHEX  = '#ffff00'
export const greenHEX   = '#00ff00'
export const blueHEX    = '#0000ff'
export const grayHEX    = '#dddddd'
export const whiteHEX   = '#ffffff'


export const purpleHEX = '#A020F0'
export const turquoiseHEX = '#3f888f'
export const orangeHEX = '#ff8800'

export const supportedColors = ['r','g','b','y','p','o','t',]

export function getColorHEX(s){
    switch(s){
        case 'r':
            return redHEX
        case 'g':
            return greenHEX
        case 'b':
            return blueHEX
        case 'y':
            return yellowHEX

        case 'p':
            return purpleHEX
        case 'o':
            return orangeHEX
        case 't':
            return turquoiseHEX
        
        default:
            return grayHEX
    }
}