import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Box, Cone, Cylinder, Sphere } from "@react-three/drei";
import textures from "../images/textures";

interface ShipProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  separator?: boolean;
}

export const ShipFreezerSupport = ({
  position,
  rotation = [0, Math.PI / 2, 0],
  separator = true,
}: ShipProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position,
    args: [1],
  }));

  return (
    <>
      <mesh
        castShadow
        ref={ref as React.MutableRefObject<Mesh>}
        rotation={rotation}
      >
        <group rotation={rotation}>
          <Box
            receiveShadow
            castShadow
            scale={[2.45, 0.03, 0.2]}
            rotation={[0, 0, Math.PI / 28]}
            position={[-4, -0.35, 0]}
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
            position={[-5.2, -0.6, 0]}
            scale={[0.02, 0.2, 0.06]}
            rotation={[0, 0, Math.PI]}
          >
            <meshStandardMaterial
              attach="material"
              color={"#F6F6F6"}
              metalness={0}
              roughness={0}
            />
          </Cone>

          <Sphere
            receiveShadow
            castShadow
            position={[-4.85, -0.02, 0]}
            scale={[0.2, 0.2, 0.3]}
          >
            <meshStandardMaterial
              attach="material"
              color={"cyan"}
              metalness={0}
              roughness={0}
            />
          </Sphere>

          {separator ? (
            <Sphere
              receiveShadow
              castShadow
              position={[-4.5, -0.02, -1.2]}
              scale={[0.5, 0.5, 0.3]}
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
    </>
  );
};
