import React, { useRef, useEffect } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { Vector3, Clock } from 'three';
import { FPVControls } from './FPVControls';

const SPEED = 6;
const Player1 = (props) => {
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
        args:[1,20,10],
        ...props,
    }));

    const velocity = useRef([0, 0, 0]);
    const pos = useRef([1, 3, 1]);


    // console.log(velocity);

    useEffect(() => {

        // console.log("ef", ref.current.position);
        // camera.lookAt(ref.current.position);
        api.velocity.subscribe((v) => {
            return (v !== velocity.current) ? velocity.current = v : null;
        });
        console.log("api vel", velocity.current);
        api.position.subscribe((p) => {
            // console.log("api pos",p);
            pos.current = p;
            return;
        })
        console.log("position of mesh ", ref.current.position, pos.current);
        // api.position.current=velocity;
        // api.position.subscribe((p)=>(ref.current.position.set(p)))
        // console.log("vel",api.velocity.current);
        // camera.position.copy(api.position.current);
    }, [velocity.current]);




    const { camera, gl } = useThree();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const currTime = Date.now();
        const diffTime = currTime - time;
        time = currTime;

        // camera.position.copy(ref.current.position);

        camera.position.set(pos.current[0], pos.current[1] +0.7 , pos.current[2]);

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
        let up = (jump ? 19 : -10);
        if (ref.current.position.y < 2) { ref.current.position.y = 2 }
        if (ref.current.position.y > 40) { ref.current.position.y = 40 }

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);


        // ref.current.position.y = ref.current.position.y + Math.sin(time * 2) / 100;

        // ref.current.position.x = (ref.current.position.x + (diffTime * (10 ** -14)) * direction.x);
        // ref.current.position.z = (ref.current.position.z + (diffTime * (10 ** -14)) * direction.z) ;
        // ref.current.position.y = (ref.current.position.y + (diffTime * (10 ** -14)) * up )

        // const meshRef = ref.current;
        // camera.add(meshRef);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
            api.velocity.set(velocity.current[0], 8 , velocity.current[2]);
        }
    });



    return (
        <>
            <FPVControls />

            <mesh
                ref={ref}
            // args={[camera, gl.domElement]}
            >

                <sphereGeometry
                args={[0.11,100,100]}
                />
                <meshStandardMaterial 
                color={"white"}
                opacity={0.1} 
                roughness={0}
                transparent
                // transmission={1}
                />
            </mesh>

        </>
    );
};

export default Player1