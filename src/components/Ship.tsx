import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Sphere } from "@react-three/drei";

interface HouseProps {
  position: [number, number, number];
}

export const Ship = ({ position }: HouseProps) => {
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
          scale={[0.4, 0.4, 0.6]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
          scale={[0.2, 0.2, 0.4]}
          position={[0, 0.3, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[0, 0, 0.5]} scale={[0.15, 0.15, 0.15]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[-0.15, -0.1, 0.45]} scale={[0.1, 0.1, 0.1]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere position={[0.15, -0.1, 0.45]} scale={[0.1, 0.1, 0.1]}>
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Cone
          position={[0.3, -0.35, 0.3]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, (9 * Math.PI) / 8]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[-0.3, -0.35, 0.3]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, (7 * Math.PI) / 8]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[0.3, -0.35, -0.3]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, (9 * Math.PI) / 8]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[-0.3, -0.35, -0.3]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, (7 * Math.PI) / 8]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[0.3, 0, 0.5]}
          scale={[0.05, 0.3, 0.05]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[-0.3, 0, 0.5]}
          scale={[0.05, 0.3, 0.05]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[0.3, 0.25, 0.5]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[-0.3, 0.25, 0.5]}
          scale={[0.05, 0.5, 0.05]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial
            attach="material"
            color={"white"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Cone
          position={[0, 0.25, -0.6]}
          scale={[0.05, 0.4, 0.05]}
          rotation={[-Math.PI / 4, 0, 0]}
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
