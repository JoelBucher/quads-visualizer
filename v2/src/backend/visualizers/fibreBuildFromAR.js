
export function fibreBuildFromAR(ar){
    var key = 0

    var tiles = []

    for(var x=0; x<ar.X; x++){
        for(var y=0; y<ar.Y; y++){
            for(var z=0; z<ar.Z; z++){
                key++
                var corner = ar.array[x][y][z]

                var tilePos
                var tileGeometry

                if(corner.bottom[0] != null){
                    tilePos = [x + 0.5, y + 0, z + 0.5]
                    tileGeometry = [0.9, 0.1, 0.9]
                    tiles = addTile(tiles, key, tilePos, tileGeometry, corner.bottom[0])
                }

                if(corner.back[0] != null){
                    tilePos = [x + 0.5, y + 0.5, z + 0]
                    tileGeometry = [0.9, 0.9, 0.1]
                    tiles = addTile(tiles, key, tilePos, tileGeometry, corner.back[0])
                }

                if(corner.left[0] != null){
                    tilePos = [x + 0, y + 0.5, z + 0.5]
                    tileGeometry = [0.1, 0.9, 0.9]
                    tiles = addTile(tiles, key, tilePos, tileGeometry, corner.left[0])
                }
            }
        }
    }
    return tiles.map((tile) => <>{tile}</>)
}

function addTile(tiles, key, tilePos, tileGeometry, tile){
    tiles.push(
        <mesh
            key = {key}
            position={tilePos}
        >
            <meshStandardMaterial color={tile.getColor()}/>
            <boxGeometry args={tileGeometry}/>
        </mesh>
    )
    return tiles
}