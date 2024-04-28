import { useBox, useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Box, Cone, Cylinder, Sphere } from "@react-three/drei";
import textures from "../images/textures";
import { ShipCapsuleSupport } from "./ShipCapsuleSupport";
import { Door } from "./Door";
import { ShipFreezerSupport } from "./ShipFreezerSupport";

interface ShipProps {
  position: [number, number, number];
}

export const ShipFreezer = ({ position }: ShipProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    scale: [10, 3, 10],
  }));

  return (
    <>
      <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
        <Sphere
          receiveShadow
          castShadow
          args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
          scale={[5, 1, 5]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshStandardMaterial
            attach="material"
            map={textures.shipFreezerTexture}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <ShipFreezerSupport position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 6, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, (2 * Math.PI) / 3, 0]}
          separator={false}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, (5 * Math.PI) / 6, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, -Math.PI / 6, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, -Math.PI / 3, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, -(2 * Math.PI) / 3, 0]}
        />
        <ShipFreezerSupport
          position={[0, 0, 0]}
          rotation={[0, -(5 * Math.PI) / 6, 0]}
        />

        <Sphere
          receiveShadow
          castShadow
          position={[0, 0.25, 3.9]}
          scale={[0.9, 0.5, 0.9]}
        >
          <meshStandardMaterial
            attach="material"
            color={"purple"}
            metalness={0}
            roughness={0}
          />
        </Sphere>

        <Sphere
          receiveShadow
          castShadow
          position={[-0.7, 0.0, 4.7]}
          scale={[0.2, 0.2, 0.3]}
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
          position={[0.7, 0.0, 4.7]}
          scale={[0.2, 0.2, 0.3]}
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
