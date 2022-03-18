import Link from 'next/link';
import React, { useRef, useEffect } from 'react'
import { useState } from 'react';
import reactDom from 'react-dom';
import { useParallax, Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import styles from '../styles/Game.module.scss';
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
            <sphereBufferGeometry attach='geometry' args={[1, 80, 25]} />
            <meshStandardMaterial attach='material' color='aqua' wireframe={true} />
            {/* <MeshWobbleMaterial attach='material' speed={2} factor={0.6} color='aqua' /> */}
        </mesh>
    )
}

const Game1 = () => {


    let [h, setH] = useState();
    let [w, setW] = useState(0);
    useEffect(() => {
        // console.log("Home");
        setH(window.innerHeight);
        setW(window.innerWidth);
        // console.log("home height", h, w);

        window.addEventListener('resize', () => {
            setW(window.innerWidth);
            setH(window.innerHeight);
            // console.log("height", h, w);
        })
    })

    return (
        <>
            <div>
                <ParallaxProvider>
                    {/* <div
                        id="test"
                        style={{
                            // position: "relative",
                            height: "100vh",
                            width: "100vw",
                            // backgroundColor: "green"
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
                            startScroll={100}
                            endScroll={h}
                            speed={0}
                        >
                            <h1>SLOW</h1>
                        </Parallax>
                        
                    </div> */}

                    <ParallaxBanner
                        layers={[
                            {
                                children: (
                                    <img style={{
                                        position: "absolute",
                                        top: "10%",
                                        // width: "100%",
                                        height: "100%",
                                        minWidth: "1920px",
                                        left: "50%",
                                        transform: "translateX(-50%)"
                                    }}
                                        src='background/s2aa.jpg' />


                                ),
                                startScroll: 0,
                                endScroll: 2 * h,
                                style: {
                                    overflow: "hidden",
                                },
                                translateY: [-10, 20]
                            },

                            {
                                children: (
                                    <img style={{
                                        position: "absolute",
                                        top: "25%",
                                        // width: "100%",
                                        height: "8%",
                                        left: "50%",
                                        transform: `translateX(-50%)
                                         rotate(${Math.atan(h / w) * 180 / Math.PI + 5}deg)
                                         `
                                    }}
                                        src='meteor1.png' />
                                ),
                                startScroll: h,
                                endScroll: 1.25 * h,
                                translateY: [0, 60],
                                translateX: [0, 60]
                            },

                            {
                                children: (
                                    <img style={{
                                        position: "absolute",
                                        top: "20%",
                                        // width: "100%",
                                        height: "15%",
                                        left: "75%",
                                        transform: "translateX(-50%)"
                                    }}
                                        src='planet1.png' />
                                ),
                                startScroll: 0,
                                endScroll: 2 * h,
                                translateY: [-5, 30]
                            },


                            // {
                            //     // image: 'rocket.png',
                            //     // speed: 100,
                            //     // scale: [0.15, 0.15],

                            //     // in %
                            //     translateX: [-50, 120],
                            //     translateY: [65, 0],

                            //     // startScroll: 100,
                            //     startScroll: 0,
                            //     // direct variable
                            //     endScroll: h * 2,

                            //     children: (
                            //         <img style={{
                            //             // position: "absolute",
                            //             // top: "0%",
                            //             width: "8%",
                            //             minWidth: "50px",
                            //             maxWidth: "100px"
                            //         }}
                            //             src='rocket.png' />
                            //     )
                            // },

                            // {
                            //     startScroll: h,
                            //     endScroll: h * 2,
                            //     translateY: [0, 20],
                            //     // image: 'mountain.png',
                            //     // speed: -20,
                            //     children: (
                            //         <img style={{
                            //             position: "absolute",
                            //             top: "100%",
                            //             width: "100%",
                            //             maxHeight: "500px",
                            //             // overflow: "hidden"
                            //             transform: "translateY(-100%)",
                            //             // translateX:'-100%'
                            //         }}
                            //             src='mountain.png' />
                            //     )
                            // },

                            {
                                translateX: [55, 0],
                                startScroll: 0,
                                endScroll: 2 * h,
                                children: (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "34%",
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

                                            <pointLight position={[-10, 0, -20]} intensity={0.8} />
                                            <pointLight position={[0, -10, 0]} intensity={0.5} />

                                            <group>
                                                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} >
                                                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
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
                                // image: 'mountain.png',
                                // speed: -20,
                                children: (
                                    <div
                                        // className={styles.f1}
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            // font:"Apple Chancery"
                                        }}
                                    >
                                        <Link href="/playgr1">
                                            <a href="/playgr1" style={{
                                                textDecoration: "none",
                                                cursor: "pointer"
                                            }}>
                                                {" "}
                                                <span className={styles.f1}  > Hi Space </span>
                                            </a>
                                            {/* <a>Hi Space </a> */}
                                        </Link>
                                    </div>
                                )
                            },

                        ]}
                        className="aspect-[2/1]"
                    >
                        <div
                            style={{
                                // position: "relative",
                                height: "100vh",
                                width: "100vw",

                                // backgroundImage: "linear-gradient(235deg,#88daeb,#47cacc)"
                                // backgroundImage:url("../public/background/b1a.png"),
                                // backgroundColor: "green"
                            }} />
                    </ParallaxBanner>


                </ParallaxProvider>


            </div>
        </>
    )
}

export default Game1