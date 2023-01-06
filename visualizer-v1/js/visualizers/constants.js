//getColor() function defined in helper.js

export const red = new THREE.MeshStandardMaterial( {color: 0xff0000} );
export const yellow = new THREE.MeshStandardMaterial( {color: 0xffff00} );
export const green = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
export const blue = new THREE.MeshStandardMaterial( {color: 0x0000ff} );
export const gray = new THREE.MeshStandardMaterial( {color: 0xdddddd} );
export const white = new THREE.MeshStandardMaterial( {color: 0xffffff} );

export const lr = new THREE.BoxGeometry( 0.1, 1, 1 );
export const tb = new THREE.BoxGeometry( 1, 0.1, 1 );
export const fb = new THREE.BoxGeometry( 1, 1, 0.1 );

export const bar = new THREE.BoxGeometry( 1, 0.1, 0.1 );