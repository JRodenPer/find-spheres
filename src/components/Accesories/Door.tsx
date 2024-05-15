import { useSphere } from "@react-three/cannon";
import { Euler, Mesh, Vector3 } from "three";
import { Cylinder } from "@react-three/drei";
import { Skylight } from "./Skylight";

interface DoorProps {
  position: Vector3;
  scale: number;
  window?: boolean;
  rotation?: Euler;
  color?: string;
  colorBorder?: string;
}

export const Door = ({
  position,
  scale = 1,
  window = true,
  rotation = new Euler(0, 0, 0),
  color = "#A9A9A9",
  colorBorder = "white",
}: DoorProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y, position.z],
    args: [1],
    rotation: [rotation.x, rotation.y, rotation.z],
  }));

  return (
    <>
      <mesh ref={ref as React.MutableRefObject<Mesh>} rotation={rotation}>
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
          <Skylight
            position={new Vector3(0, 0.2 * scale, 0.1 * scale)}
            scale={new Vector3(0.1, 0.1, 0.1)}
          />
        ) : null}
      </mesh>
    </>
  );
};
