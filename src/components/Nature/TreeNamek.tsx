import { useBox } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Cylinder, Sphere } from "@react-three/drei";
import textures from "../../images/textures";

interface HouseProps {
  position: [number, number, number];
}

export const TreeNamek = ({ position }: HouseProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    args: [1, 1, 1],
  }));

  return (
    <>
      <mesh ref={ref as React.MutableRefObject<Mesh>} castShadow receiveShadow>
        <Cylinder args={[0.025, 0.025, 1, 8]} castShadow receiveShadow>
          <meshStandardMaterial attach="material" map={textures.woodTexture} />
        </Cylinder>

        <Sphere
          position={[0, 0.5, 0]}
          args={[0.15, 8, 6]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial attach="material" map={textures.grassTexture} />
        </Sphere>
      </mesh>
    </>
  );
};
