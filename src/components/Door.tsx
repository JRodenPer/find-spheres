import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Cylinder, Sphere } from "@react-three/drei";

interface DoorProps {
  position: [number, number, number];
  scale: number;
}

export const Door = ({ position, scale = 1 }: DoorProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position,
    args: [1],
  }));
  /*<Sphere
          args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
          scale={[height + 0.2, height + 0.3, height]}
        >
          <meshStandardMaterial
            attach="material"
            color={"#A9A9A9"}
            metalness={0}
            roughness={0}
          />
        </Sphere>*/

  return (
    <>
      <mesh receiveShadow castShadow ref={ref as React.MutableRefObject<Mesh>}>
        <Cylinder
          receiveShadow
          castShadow
          scale={[0.25 * scale, 0.4 * scale, 0.5 * scale]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={"#A9A9A9"}
            metalness={0}
            roughness={0}
          />
        </Cylinder>

        <Cylinder
          receiveShadow
          castShadow
          scale={[0.35 * scale, 0.3 * scale, 0.6 * scale]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cylinder>

        <Sphere
          receiveShadow
          castShadow
          position={[0, 0.2 * scale, 0.1 * scale]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>
      </mesh>
    </>
  );
};
