import { usePlane } from "@react-three/cannon";
import textures from "../images/textures";
import { Mesh } from "three";
import { Finisterre } from "./Finisterre";
import { SIZE_GROUND } from "../constants";
import { Circle, GradientTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  generateNoiseMap,
  generateTextureFromNoiseMap,
} from "../helper/noiseTextureHelper";
import { useEffect, useState } from "react";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  //const [texture, setTexture] = useState<THREE.Texture>();

  //useEffect(() => {
  // Generar el mapa de ruido
  const width = 512;
  const height = 512;
  const scale = 100;
  const offsetX = 0;
  const offsetY = 0;
  const noiseMap = generateNoiseMap(width, height, scale, offsetX, offsetY);

  // Generar la textura a partir del mapa de ruido
  const texture = generateTextureFromNoiseMap(noiseMap);

  return (
    <>
      {
        <mesh receiveShadow ref={ref as React.MutableRefObject<Mesh>}>
          <meshStandardMaterial attach="material" map={texture} />
          <circleGeometry args={[SIZE_X, 64]} attach="geometry" />
        </mesh>
      }

      <Finisterre />
    </>
  );
}
