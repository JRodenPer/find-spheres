import { useBox } from "@react-three/cannon";
import { Mesh, Vector3 } from "three";
import { Cylinder, Sphere } from "@react-three/drei";
import textures from "../../images/textures";

interface HouseProps {
  position: Vector3;
  height: number;
}

export const TreeNamek = ({ position, height }: HouseProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position: [position.x, position.y, position.z],
    args: [1, 1, 1],
  }));

  return (
    <>
      <mesh ref={ref as React.MutableRefObject<Mesh>}>
        <Cylinder args={[0.025, 0.025, height, 8]} castShadow receiveShadow>
          <meshStandardMaterial attach="material" map={textures.woodTexture} />
        </Cylinder>

        <Sphere
          position={[0, 0.5 * height, 0]}
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
