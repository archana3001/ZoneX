import dirtImg from '../images/dirt.jpg';
import grassImg from '../images/grass.jpg';
import glassImg from '../images/glass.png';
import logImg from '../images/log.jpg';
import woodImg from '../images/wood.png';
import { TextureLoader } from 'three';
// import { NearestFilter, LinearMipMapLinearFilter  } from 'three';
import { useLoader } from '@react-three/fiber';

export const dirt = useLoader(TextureLoader, 'images/dirt.jpg');
export const grass = useLoader(TextureLoader, 'images/grass.jpg');
export const glass = useLoader(TextureLoader, 'images/glass.png');
export const wood = useLoader(TextureLoader, 'images/wood.png');
export const log = useLoader(TextureLoader, 'images/log.jpg');

// dirt.magFilter = NearestFilter;
// dirt.minFilter = LinearMipMapLinearFilter;
// grass.magFilter = NearestFilter;
// grass.minFilter = LinearMipMapLinearFilter;
// glass.magFilter = NearestFilter;
// glass.minFilter = LinearMipMapLinearFilter;
// wood.magFilter = NearestFilter;
// wood.minFilter = LinearMipMapLinearFilter;
// log.magFilter = NearestFilter;
// log.minFilter = LinearMipMapLinearFilter