import * as THREE from 'three'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import earthTexture from './img/earth.jpg'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//3D Object loader
let loader = new FBXLoader();
const textureLoader = new THREE.TextureLoader()

//Scene 
const scene = new THREE.Scene()

//Background
const spaceTexture = new THREE.TextureLoader().load('../img/background.jpg')
scene.background = spaceTexture

//Onclicks
const objectDisplay = document.getElementsByClassName("render");
let fbxTest;
for (let element of objectDisplay){
  
    element.addEventListener("click",function(){
    scene.remove(fbxTest)
    console.log("ok");
    loader.load(`../3D_Object/${element.innerHTML}.fbx`, function(fbx){
  fbx.scale.set(0.005,0.005,0.005)
  fbxTest = fbx;
  scene.add(fbx)
  
})
  })
}

//Textures
const uvTextures = new THREE.TextureLoader().load("../img/Material__2_Base_Color")


//Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Sizes Update
window.addEventListener('resize', () => {
  //Size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 30
scene.add(camera)

//Render
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)
console.log("test") 

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true

function loop() {
  requestAnimationFrame(loop);
  controls.update()
  // planet.rotation.y += 0.001;
  //planet.rotation.y += 0.01;
  renderer.render(scene, camera);
}

loop()