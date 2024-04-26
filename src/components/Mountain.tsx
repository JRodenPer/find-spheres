import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { Mesh, Texture } from "three";
import * as textures from "../images/textures";

interface MountainProps {
  position: [number, number, number];
}

export const Mountain = ({ position }: MountainProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [refTop] = useBox(() => ({
    type: "Static",
    position: [position[0], position[1] + 0.525, position[2]],
  }));

  return (
    <>
      <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial
          map={textures.sandTexture}
          attach="material"
          metalness={0}
          roughness={0}
        />
      </mesh>

      <mesh castShadow ref={refTop as React.MutableRefObject<Mesh>}>
        <boxGeometry args={[1, 0.05, 1]} attach="geometry" />
        <meshStandardMaterial
          map={textures.grassTexture}
          attach="material"
          metalness={0}
          roughness={0}
        />
      </mesh>
    </>
  );
};
