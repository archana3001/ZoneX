import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import typefaceFont from 'three/examples/fonts/helvetiker_bold.typeface.json';
import gsap from 'gsap';



const Sur = () => {

    useEffect(() => {
        // const gui = new dat.GUI();
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const cursor = {
            x: 0,
            y: 0
        }

        const scene = new THREE.Scene();

        const renderer = new THREE.WebGL1Renderer({
            canvas: document.getElementById('sce'),
        })

        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })

        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: "pink" });
        // const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(-1,0,0);
        // mesh.scale.set(0.5, 0.5, 0.7)
        // scene.add(mesh);

        renderer.setSize(sizes.width, sizes.height);


        // const axesHelper = new THREE.AxesHelper(5)
        // scene.add(axesHelper);

        // const textureLoader = new THREE.TextureLoader();
        // const matcapTexture = textureLoader.load('textures/matcaps/1.png');

        // const fontLoader = new FontLoader();

        // fontLoader.load(
        //     '/fonts/gentilis_regular.typeface.json', (font) => {
        //         const textGeometry = new TextGeometry(
        //             "haha", {
        //             font: font,
        //             size: 0.5,
        //             height: 0.2,
        //             curveSegments: 5,
        //             bevelEnabled: true,
        //             bevelThickness: 0.03,
        //             bevelSize: 0.02,
        //             bevelOffset: 0,
        //             bevelSegments: 4
        //         });


        //         const textMaterial = new THREE.MeshMatcapMaterial();
        //         textMaterial.matcap = matcapTexture;

        //         const text = new THREE.Mesh(textGeometry, textMaterial);
        //         scene.add(text);
        //     });

        const g1 = new THREE.BufferGeometry();

        const ver1 = new Float32Array([
            -1.0, -1.0, 0,
            1.0, -1.0, 0,
            1.0, 1.0, 0,

            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0
        ]);

        const count = 5;
        const ver2 = new Float32Array(count * 9);
        for (let i = 0; i < count * 9; i++) {
            ver2[i] = (Math.random() - 0.5) * 4;
        }

        g1.setAttribute('position', new THREE.BufferAttribute(ver2, 3));
        const mat1 = new THREE.MeshBasicMaterial({
            color: 0xaf00e0,
            wireframe: true
        });
        const mesh1 = new THREE.Mesh(g1, mat1);
        scene.add(mesh1);

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;

        scene.add(camera);

        renderer.render(scene, camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const move = () => {
            controls.update();
            controls.enableDamping = true;
            renderer.render(scene, camera);
            window.requestAnimationFrame(move);
        }

        move();
    })

    return (<>

        <canvas id="sce"></canvas>
    </>);
};

export default Sur;
