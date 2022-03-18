import React, { ReactDOM, useState, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Sky, Icosahedron } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import Player from './Player';
import Player1 from './Player1';
import Cube from './Cube';
// import {RoundedBoxGeometry} from 'three/examples/js/geometries/RoundedBoxGeometry'
// import { useStore } from '../hooks/useStore.js';

import create from "zustand";


const Box = () => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [ref, api] = useBox(() => ({ mass: 1 }))
    const texture1 = useLoader(TextureLoader, 'carpettexture.jpeg');


    return (
        <mesh
            onClick={() => {
                api.velocity.set(0, 4, 2);
            }}
            ref={ref}
            position={[0, 0, 0]}
            castShadow
            onPointerOver={() => { setHovered(true) }}
            onPointerOut={() => { setHovered(false) }}
        // onClick={() => { setActive(!active) }}
        // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        >
            <icosahedronBufferGeometry attach='geometry' args={[0.5, 30]} />
            {/* <RoundedBoxGeometry attach='geometry' args={[1, 1, 1]} /> */}
            {/* <boxBufferGeometry attach='geometry' args={[1, 1, 1]} /> */}
            <meshPhysicalMaterial
                // displacementMap={texture1}
                attach='material'
                // thickness={2}
                roughness={1}
                // transmission={1}
                color={hovered ? "pink" : "white"}
            />
        </mesh>
    )
}

const Floor = () => {
    const ref = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0]
    }));

    // const texture = new TextureLoader().load('grass.jpg');
    // const texture = useLoader(TextureLoader, 'grass.jpg')
    // const texture1 = useLoader(TextureLoader, 'carpettexture.jpeg')

    // const pebN = useLoader(TextureLoader, 'pebbles/PebblesNormal.jpg')
    // const pebD = useLoader(TextureLoader, 'pebbles/PebblesDisp.png')
    // const peb = useLoader(TextureLoader, 'pebbles/Pebbles.jpg')
    // const pebR = useLoader(TextureLoader, 'pebbles/PebblesRough.jpg')
    // const pebA = useLoader(TextureLoader, 'pebbles/PebblesAO.jpg')

    const pebN = useLoader(TextureLoader, 'alien/alienNormal2.jpg')
    const pebD = useLoader(TextureLoader, 'alien/alienDisp2.png')
    const peb = useLoader(TextureLoader, 'alien/alien2.jpg')
    const pebA = useLoader(TextureLoader, 'alien/alienAO2.jpg')
    const pebM = useLoader(TextureLoader, 'alien/alienMetallic2.jpg')
    const pebR = useLoader(TextureLoader, 'alien/alienRough2.jpg')


    // texture.wrapS = RepeatWrapping;
    // texture.wrapT = RepeatWrapping;
    // texture.repeat.set(100, 100);

    pebD.wrapS = RepeatWrapping;
    pebD.wrapT = RepeatWrapping;
    pebD.repeat.set(10, 10);

    pebA.wrapS = RepeatWrapping;
    pebA.wrapT = RepeatWrapping;
    pebA.repeat.set(10, 10);

    pebR.wrapS = RepeatWrapping;
    pebR.wrapT = RepeatWrapping;
    pebR.repeat.set(10, 10);

    pebM.wrapS = RepeatWrapping;
    pebM.wrapT = RepeatWrapping;
    pebM.repeat.set(10, 10);

    pebN.wrapS = RepeatWrapping;
    pebN.wrapT = RepeatWrapping;
    pebN.repeat.set(10, 10);

    peb.wrapS = RepeatWrapping;
    peb.wrapT = RepeatWrapping;
    peb.repeat.set(10, 10);

    const [addCube, activeTexture] = useStore((state) => [
        state.addCube,
        state.texture,
    ]);
    return (
        <mesh position={[0, 0, 0]}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={(e) => {
                e.stopPropagation();
                const [x, y, z] = Object.values(e.point).map((coord) =>
                    Math.ceil(coord)
                );
                addCube(x, 0.55, z, activeTexture);

            }}
        >

            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshPhysicalMaterial
                // color='red'
                // map={texture}
                map={peb}
                displacementMap={pebD}
                normalMap={pebN}
                lightMap={pebA}
                metalnessMap={pebM}
                roughnessMap={pebR}
                // roughness={100}
                attach='material'
            />
        </mesh>
    )
}

const getLocalStorage = (key) => {
    JSON.parse(window.localStorage.getItem(key));
};
const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

// setLocalStorage("world",[]);

export const useStore = create((set) => ({
    cubes:
        // getLocalStorage("world") 
        // ||
        [
            // { pos: [0, 1, 2], texture: "wood" },
            // { pos: [-3, 1, -3], texture: "dirt" },
            // { pos: [1, 1, -1], texture: "log" },
            // { pos: [3, 1, 2], texture: "glass" },
            // { pos: [0, 1, 4], texture: "grass" },
        ]
    ,
    ll: 0,
    addCube: (x, y, z, texture) =>
        set((state) => {
            // console.log(x, y, z, texture);
            // console.log(state.cubes, state.ll);
            return ({
                cubes: [...state.cubes, { pos: [x, y, z], texture }],
                ll: state.ll + 1
            });
        }),
    removeCube: (x, y, z) =>
        set((state) => {
            console.log(x, y, z);
            console.log(state.cubes)
            return ({
                cubes: state.cubes.filter(
                    ({ pos }) => pos[0] !== x || pos[1] !== y || pos[2] !== z
                )
            })
        }),
    texture: "wood",
    setTexture: (texture) => set((state) => ({ texture })),
    saveWorld: () =>
        set((state) => {
            setLocalStorage("world", state.cubes);
        }),
}))

function Controls() {
    const inc = useStore(state => state.inc)
    return <button onClick={inc}>one up</button>
}

// useEffect(()=>{})

function Counter() {
    const cubes = useStore(state => state.cubes)
    return (cubes.map((cube) => {
        return (
            <Cube
                key={cube.key}
                texture={cube.texture}
                position={cube.pos}
            />
        );
    }))
    // const c = cubes[1];
    // return(<Cube position={c.pos} texture={c.texture} />)
}

const Envir1 = () => {

    // const [cubes, addCube, removeCube, saveWorld] = useStore((state) => [
    //     state.cubes,
    //     state.addCube,
    //     state.removeCube,
    //     state.saveWorld,
    // ]);
    const cubes = useStore(state => state.cubes);
    // console.log("on stage",cubes)

    return (
        <>
            <Canvas
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}
                sRGB
            // camera={{ position: [10, 2, 2] }}
            >
                {/* <color attach="background"
        args={["Violet"]}
      /> */}
                {/* <OrbitControls /> */}
                <Sky
                    sunPosition={[100, -20, 100]}
                />
                <Stars />

                <ambientLight intensity={0.5} />
                <spotLight
                    position={[80, 20, 80]}
                    angle={0.5}
                    penumbra={0.2}
                    intensity={0.8} 
                    castShadow />
                {/* <pointLight position={0,10,0}/> */}
                <Physics gravity={[0, -19, 0]}>
                    {/* <Box /> */}
                    {/* <Suspense fallback={null}> */}
                    <Floor />
                    {/* </Suspense> */}
                    {/* <Player position={[0, 3, 10]} /> */}
                    <Player1 position={[0, 5, 10]} />
                    {/* <Cubes/> */}

                    {/* {cubes.map((cube) => {
                    return (
                        <Cube
                            key={cube.key}
                            texture={cube.texture}
                            position={cube.pos}
                            addCube={addCube}
                            removeCube={removeCube}
                        />
                    );
                })} */}
                    <Cube position={[0, 0.55, 0]} texture='dirt' />
                    {/* <Counter /> */}
                    {
                        cubes.map((cube) => {
                            return (
                                <Cube
                                    key={cube.key}
                                    texture={cube.texture}
                                    position={cube.pos}
                                />
                            );
                        })
                    }
                </Physics>
            </Canvas>
        </>
    )
}

export default Envir1