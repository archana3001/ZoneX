import React, { useEffect } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from '@react-three/fiber';
import { useRef } from 'react';

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    document.addEventListener('click', () => {
      try{
      controls.current.lock();
      }
      catch(err){
        // console.log(err);
      }
    });
  }, []);

  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};