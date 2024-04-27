import { usePlane } from "@react-three/cannon";
import textures from "../images/textures";
import { Mesh } from "three";
import { Brick } from "./Brick";
import { SIZE_GROUND } from "../constants";
import { useEffect, useState } from "react";
import { Water } from "./Water";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

export const Finisterre = () => {
  const [bricksPos, setBricksPos] = useState<[number, number, number][]>([]);

  useEffect(() => {
    /*const positions: [number, number, number][] = [];
    const initPosX = -SIZE_X / 2 - 0.5;
    const endPosX = SIZE_X / 2 + 1.5;
    const initPosY = -SIZE_Y / 2 - 0.5;
    const endPosY = SIZE_Y / 2 + 0.5;
    for (let i = initPosX; i < endPosX; i++) {
      positions.push([i, -1.05, initPosY]);
      positions.push([i, -1.05, endPosY]);
    }
    for (let i = initPosY; i < endPosY; i++) {
      positions.push([initPosX, -1.05, i]);
      positions.push([endPosX - 1, -1.05, i]);
    }
    setBricksPos(positions);*/
  }, []);
  return (
    <>
      {/*bricksPos.map((item, index) => (
        <Brick key={index} position={item} />
      ))*/}
      <Water
        position={[-SIZE_X - 1, -1, 0]}
        size={[SIZE_X * 10, SIZE_Y * 10]}
      />
    </>
  );
};
