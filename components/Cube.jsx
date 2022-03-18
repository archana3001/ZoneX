import React, { useState } from 'react'
import { useBox } from '@react-three/cannon';
// import * as textures from './Textures.jsx';

import { TextureLoader } from 'three';
import { NearestFilter, LinearMipMapLinearFilter } from 'three';
import { useLoader } from '@react-three/fiber';

import { useStore } from './Envir1';

function Cube({ position, texture, ...props }) {


    // const dirt = useLoader(TextureLoader, 'images/dirt.jpg');
    // const grass = useLoader(TextureLoader, 'images/grass.jpg');
    const glass = useLoader(TextureLoader, 'images/glass.png');
    // const wood = useLoader(TextureLoader, 'images/wood.png');
    // const log = useLoader(TextureLoader, 'images/log.jpg');

    const dirt = useLoader(TextureLoader, 'blocks/t3a.jpg');
    const grass = useLoader(TextureLoader, 'blocks/t4a.jpg');
    const wood = useLoader(TextureLoader, 'blocks/t2a.jpg');
    const log = useLoader(TextureLoader, 'blocks/t1a.jpg');

    dirt.magFilter = NearestFilter;
    dirt.minFilter = LinearMipMapLinearFilter;
    grass.magFilter = NearestFilter;
    grass.minFilter = LinearMipMapLinearFilter;
    glass.magFilter = NearestFilter;
    glass.minFilter = LinearMipMapLinearFilter;
    wood.magFilter = NearestFilter;
    wood.minFilter = LinearMipMapLinearFilter;
    log.magFilter = NearestFilter;
    log.minFilter = LinearMipMapLinearFilter

    const t = { wood, grass, glass, dirt, log }

    const [addCube, removeCube, activeTexture] = useStore((state) => [
        state.addCube,
        state.removeCube,
        state.texture
    ])

    const [hover, setHover] = useState(null);

    const [ref] = useBox(() =>
    ({
        type: 'Static',
        position,
        ...props,
    }));
    return (
        <mesh castShadow ref={ref}
            onPointerMove={(e) => {
                e.stopPropagation();
                setHover(Math.floor(e.faceIndex / 2));
            }}

            onPointerLeave={(e) => {
                setHover(null);
            }}

            onClick={(e) => {
                e.stopPropagation();
                const clickedFace = Math.floor(e.faceIndex / 2);
                const { x, y, z } = ref.current.position;
                // console.log(clickedFace, x, y, z);
                if (clickedFace === 0) {
                    e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z, activeTexture);
                    return;
                } if (clickedFace === 1) {
                    e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z, activeTexture);
                    return;
                } if (clickedFace === 2) {
                    e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z, activeTexture);
                    return;
                } if (clickedFace === 3) {
                    e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z, activeTexture);
                    return;
                } if (clickedFace === 4) {
                    e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1, activeTexture);
                    return;
                } if (clickedFace === 5) {
                    e.altKey ? removeCube(x, y, z) : addCube(x , y, z - 1, activeTexture);
                    return;
                }
            }}
        >
            {[...Array(6)].map((_, index) =>
                <meshStandardMaterial
                    attachArray='material'
                    map={t[texture]}
                    key={index}
                    color={hover === index ? '#aaa' : 'white'}
                    opacity={texture === "glass" ? 0.5 : 1}
                    transparent={true}
                />
            )}
            <boxBufferGeometry attach='geometry' />
        </mesh>
    )
}

export default Cube