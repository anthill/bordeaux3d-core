'use strict';

var THREE = require('three');

var CameraProxy = require('./CameraProxy');

// global variables for time
var curHour = 10;
var seasonsMonth = [7, 11];
var curMonth = seasonsMonth[0];

// Create the scene and set the scene size.
var scene = new THREE.Scene();

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

// skysphere
var geometry = new THREE.SphereGeometry(100000, 60, 40);
var uniforms = {
  texture: { type: 't', value: THREE.ImageUtils.loadTexture('../img/sky.jpg') }
};

var material = new THREE.ShaderMaterial( {
  uniforms:       uniforms,
  vertexShader:   document.getElementById('sky-vertex').textContent,
  fragmentShader: document.getElementById('sky-fragment').textContent
});

var skyBox = new THREE.Mesh(geometry, material);
skyBox.scale.set(-1, 1, 1);
skyBox.eulerOrder = 'XZY';
skyBox.renderDepth = 1000.0;
scene.add(skyBox);

// Create a camera, zoom it out from the model a bit, and add it to the scene.
var camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 1, 500000 );
scene.add(camera);

var sunlight = new THREE.DirectionalLight(0xffffff, 1);

sunlight.castShadow = true;
sunlight.shadowDarkness = 0.6;
sunlight.shadowMapWidth = 4096;
sunlight.shadowMapHeight = 4096;
sunlight.shadowCameraNear = 1;
sunlight.shadowCameraFar = 4000;

sunlight.shadowCameraRight     =  200;
sunlight.shadowCameraLeft     = -200;
sunlight.shadowCameraTop      =  200;
sunlight.shadowCameraBottom   = -200;
// sunlight.shadowCameraVisible = true;

scene.add(sunlight);

var ambientLight = new THREE.AmbientLight( "#333329" ); 
scene.add( ambientLight );

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapWidth = 4096;
renderer.shadowMapHeight = 4096;

// Set the background color of the scene.
renderer.setClearColorHex(0x333F47, 1);
document.body.appendChild(renderer.domElement);

// Renders the scene and updates the render as needed.
(function animate() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.render(scene, camera);

})();

module.exports = {
    scene: scene,
    camera: CameraProxy(camera),
    light: sunlight,
    renderer: renderer
};