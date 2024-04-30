import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { Finisterre } from "./Finisterre";
import { GROUND_POSITION, SIZE_GROUND } from "../constants";
import {
  generateNoiseMap,
  generateTextureFromNoiseMap,
} from "../helper/noiseTextureHelper";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, GROUND_POSITION, 0],
  }));

  const width = 512;
  const height = 512;
  const scale = 100;
  const offsetX = 0;
  const offsetY = 0;
  const noiseMap = generateNoiseMap(width, height, scale, offsetX, offsetY);

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
