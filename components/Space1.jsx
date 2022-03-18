import React, { useRef, useEffect } from 'react'
import { useState } from 'react';
import reactDom from 'react-dom';
import { useParallax, Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from 'three';

softShadows();

const Mesh1 = () => {
    const mesh = useRef(null);
    useFrame(() => { mesh.current.rotation.x = mesh.current.rotation.y += 0.01 });
    return (
        <mesh castShadow={true}
            position={[0, 1, 0]}
            ref={mesh}
        >
            {/* <boxBufferGeometry attach='geometry' args={[1, 1, 1]} /> */}
            {/* <circleBufferGeometry attach='geometry' args={[2, 100]} /> */}
            <sphereBufferGeometry attach='geometry' args={[1.5, 200, 50]} />
            <meshStandardMaterial attach='material' color='pink' wireframe={true} />
            {/* <MeshWobbleMaterial attach='material' speed={2} factor={0.6} color='aqua' /> */}
        </mesh>
    )
}

const Space1 = () => {


    let [h, setH] = useState();
    let [w, setW] = useState(0);
    useEffect(() => {
        // console.log("space");
        setH(window.innerHeight);
        setW(window.innerWidth);
        // console.log("space height", h, w);
        window.addEventListener('resize', () => {
            setW(window.innerWidth);
            setH(window.innerHeight);
            // console.log("height", h, w);
        })
    })


    return (
        <ParallaxProvider>
            {/* <div
                id="test"
                style={{
                    position: "relative",
                    height: "100vh",
                    width: "100vw",
                    backgroundColor: "green"
                }}>
                <Parallax
                    translateX={['0px', '200px']}
                    translateY={['20px', '0px']}

                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "0%"
                    }}
                >
                    <h1>FAST{h}</h1>
                </Parallax>
                <Parallax
                    style={{
                        position: "absolute",
                        top: "0%",
                        left: "0%"
                    }}
                    rotateZ={[0, 360]}
                    startScroll={500}
                    endScroll={h}
                    speed={0}
                >
                    <h1>SLOW</h1>
                </Parallax>
            </div> */}

            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    // backgroundColor: "green"
                    backgroundImage: "linear-gradient(red,blue)"
                }}
            />

            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    // backgroundColor: "green"
                    backgroundImage: "linear-gradient(orange,#fff,aqua)"
                }}
            >
                <ParallaxBanner
                    layers={[
                        // {
                        //     // image: 'rocket.png',
                        //     // speed: 100,
                        //     // scale: [0.15, 0.15],

                        //     // in %
                        //     translateX: [10, 90],
                        //     translateY: [30, 0],

                        //     // startScroll: 100,
                        //     startScroll: 0.5 * h,
                        //     // direct variable
                        //     endScroll: h,

                        //     children: (
                        //         <img style={{
                        //             position: "absolute",
                        //             // top: "0%",
                        //             width: "8%",
                        //             minWidth: "50px",
                        //             maxWidth: "100px"
                        //         }}
                        //             src='rocket.png' />
                        //     )
                        // },
                        {
                            children: (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        // font:"Apple Chancery"
                                    }}
                                >
                                    Hi hello QD
                                </div>
                            )
                        },
                        {

                            children: (
                                <img style={{
                                    position: "absolute",
                                    top: "100%",
                                    width: "100%",
                                    maxHeight: "500px",
                                    // overflow: "hidden"
                                    transform: "translateY(-100%)",
                                    // translateX:'-100%'
                                }}
                                    src='mountain.png' />
                            )
                        },
                        {
                            translateX: [0, 55],
                            // translateY: [0, 60],
                            startScroll: 0.6 * h,
                            endScroll: h,
                            children: (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "0%",
                                        left: "0%",
                                        height: "50vh",
                                        width: "50vw",
                                        // backgroundColor: "red"
                                    }} >
                                    <Canvas
                                        onCreated={({ gl }) => {
                                            gl.shadowMap.enabled = true
                                            gl.shadowMap.type = THREE.PCFSoftShadowMap
                                        }}
                                        sRGB
                                    >
                                        <ambientLight intensity={0.6} />
                                        <directionalLight
                                            castShadow
                                            position={[0, 5, 0]}
                                            intensity={1.2}
                                            shadow-mapSize-height={1024}
                                            shadow-mapSize-width={1024}
                                            shadow-camera-far={50}
                                            shadow-camera-left={-10}
                                            shadow-camera-right={10}
                                            shadow-camera-top={10}
                                            shadow-camera-bottom={-10}
                                        />
                                        {/* <pointlLight
                                            castShadow
                                            position={[0, 5, 0]}
                                            intensity={0.5}
                                        /> */}
                                        <pointLight position={[-10, 0, -20]} intensity={0.8} />
                                        <pointLight position={[0, -10, 0]} intensity={0.5} />

                                        {/* <mesh>
                                            <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
                                            <circleBufferGeometry attach='geometry' args={[2, 100]} /> 
                                            <meshStandardMaterial attach='material' color='pink' />
                                        </mesh> */}

                                        <group>
                                            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} >
                                                <planeBufferGeometry attach='geometry' args={[100, 100]} />
                                                {/* <meshStandardMaterial attach='material' color={"blue"} /> */}
                                                <shadowMaterial attach='material' opacity={0.3} />
                                            </mesh>
                                        </group>
                                        <Mesh1 />
                                        position: "absolute",
                                        top: "100%",    </Canvas>
                                </div>
                            )
                        },
                        {
                            // image: 'rocket.png',
                            // speed: 100,
                            // scale: [0.15, 0.15],

                            // in %
                            translateX: [10, 90],
                            translateY: [30, 0],

                            // startScroll: 100,
                            startScroll: 0.5 * h,
                            // direct variable
                            endScroll: h,

                            children: (
                                <img style={{
                                    position: "absolute",
                                    // top: "0%",
                                    width: "8%",
                                    minWidth: "50px",
                                    maxWidth: "100px"
                                }}
                                    src='rocket.png' />
                            )
                        },

                    ]}
                    className="aspect-[2/1]"
                >
                    <div
                        style={{
                            position: "relative",
                            height: "100vh",
                            width: "100vw",
                        }} >
                        <div
                            style={{
                                backgroundColor: "green"
                            }} >
                        </div>
                    </div>
                </ParallaxBanner>
            </div>
        </ParallaxProvider>
    );
}

export default Space1