import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Cylinder, Sphere } from "@react-three/drei";
import textures from "../images/textures";
import { ShipCapsuleSupport } from "./ShipCapsuleSupport";
import { Door } from "./Door";

interface ShipProps {
  position: [number, number, number];
}

export const ShipCapsule = ({ position }: ShipProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position,
    args: [1],
  }));

  return (
    <>
      <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
        <Sphere
          receiveShadow
          castShadow
          args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
          scale={[0.6, 0.6, 0.6]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshStandardMaterial
            attach="material"
            map={textures.capsuleTexture}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Cylinder
          receiveShadow
          castShadow
          scale={[0.6, 0.01, 0.1]}
          rotation={[0, Math.PI / 4, 0]}
          position={[0, -0.5, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={"#F6F6F6"}
            metalness={0}
            roughness={0}
          />
        </Cylinder>

        <Cylinder
          receiveShadow
          castShadow
          scale={[0.6, 0.01, 0.1]}
          rotation={[0, -Math.PI / 4, 0]}
          position={[0, -0.5, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={"#F6F6F6"}
            metalness={0}
            roughness={0}
          />
        </Cylinder>
        <ShipCapsuleSupport position={[-0.4, -0.6, -0.4]} />
        <ShipCapsuleSupport position={[-0.4, -0.6, 0.4]} />
        <ShipCapsuleSupport position={[0.4, -0.6, 0.4]} />
        <ShipCapsuleSupport position={[0.4, -0.6, -0.4]} />

        <Door
          position={[0.0, -0.15, 0.51]}
          scale={0.45}
          window={false}
          rotation={[Math.PI / 8, 0, 0]}
          color={"#F6F6F6"}
          colorBorder={"#000850"}
        />

        <Sphere
          receiveShadow
          castShadow
          position={[-0.5, -0.25, 0]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[-0.3, -0.25, 0.4]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[-0.3, -0.25, -0.4]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[0.5, -0.25, 0]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[0.3, -0.25, 0.4]}
          scale={[0.1, 0.1, 0.1]}
        >
          <meshStandardMaterial
            attach="material"
            color={"cyan"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[0.3, -0.25, -0.4]}
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
