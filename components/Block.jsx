import React, { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

const Block = () => {

    useEffect(() => {
        // const canvas = new THREE.Scene()
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGL1Renderer({
            canvas: document.getElementById('block'),
        })

        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color:'red',wireframe:true});
        // const mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);

        // For creating geometry

        // const points = []
        // const v1 = new THREE.Vector3(0,0,0);
        // points.push(v1);
        // const v2 = new THREE.Vector3(0,1,0);
        // points.push(v2);
        // const v3 = new THREE.Vector3(1,0,0);
        // points.push(v3);
        // const g1 = new THREE.BufferGeometry().setFromPoints(points);
        // const ma1 = new THREE.MeshBasicMaterial({ color:'red',wireframe:true});
        // const me1 = new THREE.Mesh(g1,ma1);
        // scene.add(me1);


        const geometry = new THREE.BufferGeometry();

        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array([
            -1.0, -1.0, 0,
            1.0, -1.0, 0,
            1.0, 1.0, 0,

            1.0, 1.0, 1.0,
            -1.0, 1.0, 1.0,
            -1.0, -1.0, 1.0
        ]);

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const material = new THREE.MeshBasicMaterial({ color: 0xaf00e0, wireframe: true });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);



        // For Aspect Ratio 
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }


        // For making canvas responsive to resizing
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


        // For Full Screen
        window.addEventListener('dblclick', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen()
                    .then(() => console.log("Document Exited from Full screen mode"))
                    .catch((err) => console.error(err))
            } else {
                document.documentElement.requestFullscreen();
            }
        })

        renderer.setSize(sizes.width, sizes.height);

        // setting pixel ratio
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.z = 4;
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enabled= false;
        controls.enableDamping = true;

        renderer.render(scene, camera)

        gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
        gsap.to(mesh.position, { duration: 1, delay: 2.1, x: 0 });

        const clock = new THREE.Clock();
        const move = () => {

            // TO enable damping of controls
            controls.update();

            const elapsedTime = clock.getElapsedTime();
            // mesh.position.x=Math.cos(elapsedTime*2*Math.PI);
            // mesh.position.y=Math.sin(elapsedTime*2*Math.PI);
            renderer.render(scene, camera);
            window.requestAnimationFrame(move);
        }
        move();
    })

    return (<canvas id="block"></canvas>);
};

export default Block;
