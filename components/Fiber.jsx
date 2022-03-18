import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
// import { useSpring, animated } from '@react-spring/web';

const Box = () => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    const [ref] = useBox(() => ({ mass: 3 }))

    return (
        <mesh
            ref={ref}
            position={[0, 1, 0]}
            onPointerOver={() => { setHovered(true) }}
            onPointerOut={() => { setHovered(false) }}
            onClick={() => { setActive(!active) }}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        >
            <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
            <meshLambertMaterial
                attach='material'
                color={hovered ? "pink" : "white"}
            />
        </mesh>
    )
}

const Floor = () => {
    const ref = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0]
    }));
    return (
        <mesh position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshLambertMaterial attach='material' color='blue' />
        </mesh>
    )
}

const Fiber = () => {
    return (
        <Canvas styles={{ background: "red" }}>
            <color attach="background" args={["Violet"]} />
            <OrbitControls />
            <Stars />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 0, 10]} angle={0.3} />
            <Physics>
                <Box />
                <Floor />
            </Physics>
        </Canvas>

        // <Canvas style={{ height: 400, width: 400 }}>
        //     <color attach="background" args={["black"]} />
        // </Canvas>
    )
}

export default Fiber;
