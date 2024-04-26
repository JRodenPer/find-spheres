import { useBox } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Cylinder, Sphere } from "@react-three/drei";
import textures from "../images/textures";

interface HouseProps {
  position: [number, number, number];
}

export const ThreeNamek = ({ position }: HouseProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    args: [1, 1, 1],
  }));

  return (
    <>
      <mesh ref={ref as React.MutableRefObject<Mesh>}>
        <Cylinder scale={[0.025, 1, 0.025]}>
          <meshStandardMaterial
            attach="material"
            map={textures.woodTexture}
            metalness={0}
            roughness={0}
          />
        </Cylinder>

        <Sphere position={[0, 0.5, 0]} scale={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial
            attach="material"
            map={textures.grassTexture}
            metalness={0}
            roughness={0}
          />
        </Sphere>
      </mesh>
    </>
  );
};
