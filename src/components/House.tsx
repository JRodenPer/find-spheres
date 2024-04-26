import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Sphere } from "@react-three/drei";

interface HouseProps {
  position: [number, number, number];
}

export const House = ({ position }: HouseProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position,
    args: [1],
  }));

  return (
    <>
      <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
        <Sphere
          args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
          scale={[1, 1, 1.5]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[-0.55, 0.3, 1]} scale={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[0, 0.65, 1]} scale={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[0.55, 0.3, 1]} scale={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>
        <Cone
          position={[0.8, 1, 0.4]}
          scale={[0.15, 1, 0.15]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>
        <Cone position={[0, 1, 0.4]} scale={[0.15, 1, 0.15]}>
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>
        <Cone
          position={[-0.8, 1, 0.4]}
          scale={[0.15, 1, 0.15]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>
      </mesh>
    </>
  );
};
