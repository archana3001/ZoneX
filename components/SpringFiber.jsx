import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree ,extend} from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Stars } from '@react-three/drei';
// import { mapRange } from 'gsap/all';

extend({OrbitControls});

// const Controls = () => {
//     const { camera, gl } = useThree();

//     // const orbitRef = useRef();
//     // useFrame(()=>{
//     //     orbitRef.current.update();
//     // })

//     // return(
//     // <OrbitControls
//     // args={
//     //     [camera,gl.domElement]
//     // } 
//     // ref={orbitRef}/>
//     // )

//     const controls = new OrbitControls(camera, gl.domElement);
//     useEffect(
//         () => {

//             controls.update();

//             return () => {
//                 // controls.autoRotate=true;
//                 // controls.update();
//             };
//         },
//         [camera, gl]
//     );
//     return null;
// }

const Parrot = () => {
    const [model, setModel] = useState();
    useEffect(() => {
        new GLTFLoader().load('/scene.gltf', setModel);
    })
    // console.log(model);
    return model ? <primitive 
    position={[0,-0.4,0]}
    object={model.scene} /> : null;
}

const Box = () => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const props = useSpring({
        color: hovered ? "hotpink" : '#1C658C',
    })
    useFrame(() => {
        meshRef.current.rotation.y += 0.04;
    })
    return (
        <mesh
            scale={[0.5,1.9,0.5]}
            position={[-0,0.4,-1.1]}
            ref={meshRef}
            onPointerOver={() => { setHovered(true) }}
            onPointerOut={() => { setHovered(false) }}
            castShadow>

            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <animated.meshPhysicalMaterial
                attach="material"
                color={props.color} />

        </mesh>
    )
}

const Plane = () => {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow={true}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial
                attach="material"
                color="red" />

        </mesh>)
}

const SpringFiber = () => {
    return (
        <>
            <Canvas
                camera={{ position: [8, 5, -5], fov: 80 }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}
            >
                <ambientLight intensity={0.4} />
                <pointLight
                    castShadow
                    intensity={2}
                    position={[0, 5, 10]}
                    penumbra={0}
                />
                <OrbitControls />
                <fog attach='fog' args={["white", 0, 40]} />
                <Box />
                <Plane />
                <Parrot />
            </Canvas>
            <h1
            className="f1"
                style={{ position: "absolute" }}>HI {process.env.NEXT_PUBLIC_NAME}</h1>
        </>
    )
};

export default SpringFiber;
