import create from "zustand";
import Cube from "../components/Cube";

const getLocalStorage = (key) => {
  JSON.parse(window.localStorage.getItem(key));
};
const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = create((set) => ({
  cubes: getLocalStorage("world") || [
    { pos: [0, 0, 0], texture: "wood" },
    { pos: [7, 0, 0], texture: "dirt" },
    { pos: [1, -5, 0], texture: "log" },
    { pos: [3, 0, 0], texture: "glass" },
    { pos: [0, 3, 0], texture: "grass" },
  ],
  addCube: (x, y, z, texture) =>
    set((state) => {
      ({
        cubes: [...state.cubes, { pos: [x, y, z], texture }],
      });
    }),
  removeCube: (x, y, z, texture) =>
    set((state) => {
      state.cubes.filter((cube) => {
        cube.x !== x || cube.y !== y || cube.z !== z;
      });
    }),
  texture: "wood",
  setTexture: (texture) => set((state) => ({ texture })),
  saveWorld: () =>
    set((state) => {
      setLocalStorage("world", state.cubes);
    }),
}));

export const Cubes = () => {
  const cubes = useStore((state) => state.cubes)
  return (cubes.map(cube => {
    <Cube position={cube.pos} texture={cube.texture} />
  }))
}

// import create from 'zustand';
// import { nanoid } from 'nanoid';

// const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
// const setLocalStorage = (key, value) =>
//   window.localStorage.setItem(key, JSON.stringify(value));

// export const useStore = create((set) => ({
//   texture: 'dirt',
//   cubes: getLocalStorage('world') || [],
//   addCube: (x, y, z) =>
//     set((state) => ({
//       cubes: [
//         ...state.cubes,
//         { key: nanoid(), pos: [x, y, z], texture: state.texture },
//       ],
//     })),
//   removeCube: (x, y, z) => {
//     set((state) => ({
//       cubes: state.cubes.filter((cube) => {
//         const [_x, _y, _z] = cube.pos;
//         return _x !== x || _y !== y || _z !== z;
//       }),
//     }));
//   },
//   setTexture: (texture) => {
//     set((state) => ({
//       texture,
//     }));
//   },
//   saveWorld: () =>
//     set((state) => {
//       setLocalStorage('world', state.cubes);
//     }),
// }));
