import "./style.css";
import * as Three from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Three.Scene();
let camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new Three.TorusGeometry(10, 3, 16, 100);
const material = new Three.MeshBasicMaterial({
  wireframe: true,
  color: 0xff6347,
});
const torus = new Three.Mesh(geometry, material);

scene.add(torus);

const pointLight = new Three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new Three.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new Three.PointLightHelper(pointLight);
const gridHelper = new Three.GridHelper(200, 50, 0xff0000);
scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new Three.SphereGeometry(0.25, 24, 24);
  const material = new Three.MeshStandardMaterial({ color: 0xffffff });
  const star = new Three.Mesh(geometry, material);

  const [x, y, z] = Array(9999)
    .fill()
    .map(() => Three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// adding 50 star point
Array(100).fill().forEach(addStar);

const spaceTexture = new Three.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

// Box
// const jeffTexture = new Three.TextureLoader().load("/normal.jpg");
// const jeff = new Three.Mesh(
//   new Three.BoxGeometry(1, 1, 1),
//   new Three.MeshBasicMaterial({ map: jeffTexture })
// );
// // adding box to screen scene
// scene.add(jeff);

// Sphere
const moonTexture = new Three.TextureLoader().load("/moon.jpg");
const normalTexture = new Three.TextureLoader().load("/normal.jpg");
const moon = new Three.Mesh(
  new Three.SphereGeometry(3, 32, 32),
  new Three.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
// adding sphere to screen scene
scene.add(moon);

// moon.position.z = 5;
// moon.position.setX(-2);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  window.requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.05;

  // control setter
  // controls.update();

  // end of Three.js for rendering
  renderer.render(scene, camera);
}

animate();

window.onresize = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
};
