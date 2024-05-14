import { nanoid } from "nanoid";
import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Door, Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: Vector3[] = [
  new Vector3(-0.75, 0.3, 1),
  new Vector3(0.75, 0.3, 1),
  new Vector3(0.85, 0.3, 0.5),
  new Vector3(-0.85, 0.3, 0.5),
];

const SCALE: Vector3 = new Vector3(0.15, 0.15, 0.15);

interface HouseProps {
  position: Vector3;
}

export const HouseMid = ({ position }: HouseProps) => {
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y + halfHeight, position.z],
    args: [1],
  }));

  return (
    <mesh receiveShadow castShadow ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[1, 1, 2]}
      >
        <meshStandardMaterial
          attach="material"
          color={"white"}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      {POSITIONS.map((pos) => (
        <Skylight key={nanoid()} position={pos} scale={SCALE} />
      ))}

      <Sphere
        receiveShadow
        castShadow
        position={[0, 0.9, 1]}
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[0.5, 0.7, 0.5]}
      >
        <meshStandardMaterial
          attach="material"
          color={"white"}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      <Skylight
        position={new Vector3(0, 1.3, 1.2)}
        scale={new Vector3(0.25, 0.25, 0.25)}
        color={"#008B8B"}
      />

      <Door position={new Vector3(0, -0.2, 1.9)} scale={0.7} />

      <ConeDecoration
        position={new Vector3(0.4, 1.5, 1)}
        scale={new Vector3(0.15, 1, 0.15)}
        rotation={new Euler(0, 0, -Math.PI / 4)}
      />

      <ConeDecoration
        position={new Vector3(-0.4, 1.5, 1)}
        scale={new Vector3(0.15, 1, 0.15)}
        rotation={new Euler(0, 0, Math.PI / 4)}
      />
    </mesh>
  );
};
