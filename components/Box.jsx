import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import typefaceFont from 'three/examples/fonts/helvetiker_bold.typeface.json';

const Box = (props) => {

    const info = useSelector((state) => state.colour.info);
    useEffect(() => {

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const cursor = {
            x: 0,
            y: 0
        }
        // window.addEventListener('mousemove', (ev) => {
        //     cursor.x = ev.clientX / sizes.width - 0.5;
        //     cursor.y = -(ev.clientY / sizes.height - 0.5);
            // console.log(cursor.x);
        // })

        // const canvas = new THREE.Scene()
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGL1Renderer({
            canvas: document.getElementById('sce'),
        })

        window.addEventListener('resize', () => {

            // Update size
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Maintaining aspect ratio
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })

        const colour = props.colour;

        if (colour === undefined) {
            colour = "blue";
        }

        console.log(colour);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: "blue" , wireframe:true });
        const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.x = 2
        // mesh.position.y = -0.8
        // mesh.position.set(1.5, -0.8, 0);

        mesh.scale.set(0.5, 0.5, 1.4)

        // mesh.rotation.set(0.2, .4, 0)

        // scene.add(mesh);

        renderer.setSize(sizes.width, sizes.height);


        // const axesHelper = new THREE.AxesHelper(5)
        // scene.add(axesHelper);

        const textureLoader = new THREE.TextureLoader();
        const matcapTexture = textureLoader.load('textures/matcaps/1.png');

        // Fonts
        const fontLoader = new FontLoader();

        fontLoader.load(
            '/fonts/gentilis_regular.typeface.json', (font) => {
                let name = info.name;
                if (info.name === undefined) {
                    name = "Hello";
                }
                const textGeometry = new TextGeometry(
                    name, {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                });

                // For Bounding Box
                // textGeometry.computeBoundingBox();
                // console.log(textGeometry.boundingBox);
                // textGeometry.translate(
                //     -textGeometry.boundingBox.max.x*0.5,
                //     -textGeometry.boundingBox.max.y*0.5,
                //     -textGeometry.boundingBox.max.z*0.5,
                // )
                // console.log(textGeometry.boundingBox);

                // Easier Way to Centre
                textGeometry.center();

                // APPLYING TEXTUR Matcap
                // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
                // const textMaterial = new THREE.MeshMatcapMaterial({ matcap:matcapTexture });
                const textMaterial = new THREE.MeshMatcapMaterial({color:colour});
                textMaterial.matcap = matcapTexture;

                const text = new THREE.Mesh(textGeometry, textMaterial);
                scene.add(text);
            });
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 3;
        // camera.position.set(0.5, 0, 1);
        scene.add(camera);

        renderer.render(scene, camera)

        let k = 0.02;


        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;


        // let time = Date.now(); 


        // using clock

        // const clock = new THREE.Clock();

        const move = () => {
            controls.update();
            controls.enableDamping = true;

            // mesh.position.x+=k;

            // const currTime = Date.now(); 
            // const diffTime = currTime - time;
            // time =  currTime;
            // mesh.rotation.x +=0.002*diffTime;

            // const elapsedTime = clock.getElapsedTime();

            // For 1 complete rotation per second

            // mesh.rotation.x = elapsedTime*Math.PI*2;

            // if(mesh.position.x>=2.5 || mesh.position.x<=-2.5 ){
            //     k *= -1;
            // }

            // For calculation per sec

            // mesh.position.x = Math.cos(elapsedTime * 2 * Math.PI);
            // mesh.position.y = Math.sin(elapsedTime * 2 * Math.PI);

            // camera.position.x = 0.5 * Math.cos(elapsedTime * 1 * Math.PI);
            // camera.position.y = 0.5 * Math.sin(elapsedTime * 1 * Math.PI);


            // Adjusting camera focus to mesh
            // camera.lookAt(mesh.position);
            // camera.position.x = Math.sin(cursor.x*Math.PI*2)* 3;
            // camera.position.z = Math.cos(cursor.x*Math.PI*2)* 3;
            // camera.position.y = cursor.y * 10;

            renderer.render(scene, camera);
            window.requestAnimationFrame(move);
        }

        move();
    })

    return (<canvas id="sce"></canvas>);
};

export default Box;
