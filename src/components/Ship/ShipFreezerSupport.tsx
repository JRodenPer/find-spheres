import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Box, Cone, Sphere } from "@react-three/drei";
import { Skylight } from "../Accesories";

interface ShipProps {
  position: Vector3;
  rotation?: Euler;
  separator?: boolean;
}

export const ShipFreezerSupport = ({
  position,
  rotation = new Euler(0, Math.PI / 2, 0),
  separator = true,
}: ShipProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y, position.z],
    args: [1],
  }));

  return (
    <mesh
      castShadow
      ref={ref as React.MutableRefObject<Mesh>}
      rotation={rotation}
    >
      <group rotation={rotation}>
        <Box
          receiveShadow
          castShadow
          position={new Vector3(-4, -0.35, 0)}
          scale={new Vector3(2.45, 0.03, 0.2)}
          rotation={new Euler(0, 0, Math.PI / 28)}
        >
          <meshStandardMaterial
            attach="material"
            color={"#F6F6F6"}
            metalness={0}
            roughness={0}
          />
        </Box>

        <Cone
          receiveShadow
          castShadow
          position={new Vector3(-5.2, -0.6, 0)}
          scale={new Vector3(0.02, 0.2, 0.06)}
          rotation={new Euler(0, 0, Math.PI)}
        >
          <meshStandardMaterial
            attach="material"
            color={"#F6F6F6"}
            metalness={0}
            roughness={0}
          />
        </Cone>

        <Skylight
          position={new Vector3(-4.85, -0.02, 0)}
          scale={new Vector3(0.2, 0.2, 0.3)}
        />

        {separator ? (
          <Sphere
            receiveShadow
            castShadow
            position={new Vector3(-4.5, -0.02, -1.2)}
            scale={new Vector3(0.5, 0.5, 0.3)}
          >
            <meshStandardMaterial
              attach="material"
              color={"orange"}
              metalness={0}
              roughness={0}
            />
          </Sphere>
        ) : null}
      </group>
    </mesh>
  );
};
