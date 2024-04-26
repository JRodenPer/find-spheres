import { usePlane } from "@react-three/cannon";
import textures from "../images/textures";
import { Mesh } from "three";

export function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  textures.groundTexture.repeat.set(100, 100);

  return (
    <mesh receiveShadow ref={ref as React.MutableRefObject<Mesh>}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={textures.groundTexture} />
    </mesh>
  );
}
