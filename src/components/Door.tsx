import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { Cone, Cylinder, Sphere } from "@react-three/drei";

interface DoorProps {
  position: [number, number, number];
  scale: number;
  window?: boolean;
  rotation?: [number, number, number];
  color?: string;
  colorBorder?: string;
}

export const Door = ({
  position,
  scale = 1,
  window = true,
  rotation = [0, 0, 0],
  color = "#A9A9A9",
  colorBorder = "white",
}: DoorProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position,
    args: [1],
    rotation,
  }));

  return (
    <>
      <mesh
        receiveShadow
        castShadow
        ref={ref as React.MutableRefObject<Mesh>}
        rotation={rotation}
      >
        <Cylinder
          receiveShadow
          castShadow
          scale={[0.25 * scale, 0.4 * scale, 0.5 * scale]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            color={color}
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
            color={colorBorder}
            metalness={0}
            roughness={0}
          />
        </Cylinder>

        {window ? (
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
        ) : null}
      </mesh>
    </>
  );
};
