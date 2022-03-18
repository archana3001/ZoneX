import React, { useRef, useEffect } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { Vector3, Clock } from 'three';
import { FPVControls } from './FPVControls';

const SPEED = 6;

const Player = (props) => {
 
    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
    } = useKeyboardControls();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        ...props,
    }));

    const velocity = useRef([0, 0, 0]);

    useEffect(() => {
        // camera.position.copy(ref.current.position);
        console.log("ef", ref.current.position);
        // camera.lookAt(ref.current.position);
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [moveForward]);

    const { camera, gl } = useThree();
    // camera.lookAt(ref.position);

    // const clock = new Clock();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const currTime = Date.now();
        const diffTime = currTime - time;
        time = currTime;
        // console.log(diffTime)
        camera.position.copy(ref.current.position);

        // ref.current.position.copy(camera.position);
        // ref.current.quaternion.copy(camera.quaternion);

        const direction = new Vector3();

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0,
        );
         
        // let up=1;
        let up = (jump?19:-10);
        if(ref.current.position.y<2){ref.current.position.y = 2}
        if(ref.current.position.y>40){ref.current.position.y = 40}



        direction 
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        // ref.current.position.y = ref.current.position.y + Math.sin(time * 2) / 100;

        ref.current.position.x = (ref.current.position.x + (diffTime * (10 ** -14)) * direction.x);
        ref.current.position.z = (ref.current.position.z + (diffTime * (10 ** -14)) * direction.z) ;
        ref.current.position.y = (ref.current.position.y + (diffTime * (10 ** -14)) * up )
        // const meshRef = ref.current;
        // camera.add(meshRef);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(velocity.current[0], 8, velocity.current[2]);
        }
    });



    return (
        <>
            <FPVControls />
            
            <mesh
                ref={ref}
            // args={[camera, gl.domElement]}
            > 
            
                <sphereGeometry />
                <meshStandardMaterial color={"#f30707"} />
            </mesh>

        </>
    );
};

export default Player