import './source/three.js';
import './source/OrbitControls.js';

export function setup(){
    // global vars
    const canvasWidth = 600;
    const canvasHeight = 600;

    //setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xBBBBBB );

    //setup camera
    const camera = new THREE.PerspectiveCamera( 75, canvasWidth/canvasHeight, 0.1, 1000 );
    camera.position.z = 5;

    //setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( canvasWidth, canvasHeight );
    document.getElementById("canvas").appendChild( renderer.domElement );

    //setup grid
    const size = 100;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    //setup lighting
    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0.0, 5.0, 5.0 ).normalize();
    camera.add(light)
    scene.add(camera)

    //add controls
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', render );
    controls.update();

    function render() {
        renderer.render( scene, camera );
    }
    
    render()

    return {
        scene: scene,
        camera: camera,
        renderer: renderer,
    }
}
