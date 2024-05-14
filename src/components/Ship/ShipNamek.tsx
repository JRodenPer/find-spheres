import { nanoid } from "nanoid";
import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: Vector3[] = [
  new Vector3(0, 0, 0.5),
  new Vector3(-0.15, -0.1, 0.45),
  new Vector3(0.15, -0.1, 0.45),
];

const SCALE: Vector3[] = [
  new Vector3(0.15, 0.15, 0.15),
  new Vector3(0.1, 0.1, 0.1),
  new Vector3(0.1, 0.1, 0.1),
];

interface ShipNamekProps {
  position: Vector3;
}

export const ShipNamek = ({ position }: ShipNamekProps) => {
  const halfHeight = 0.5;

  const [ref] = useSphere(() => ({
    mass: 1,
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
        scale={new Vector3(0.4, 0.4, 0.6)}
      >
        <meshStandardMaterial
          attach="material"
          color={"white"}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        position={new Vector3(0, 0.3, 0)}
        scale={new Vector3(0.2, 0.2, 0.4)}
      >
        <meshStandardMaterial
          attach="material"
          color={"white"}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      {POSITIONS.map((pos, index) => (
        <Skylight key={nanoid()} position={pos} scale={SCALE[index]} />
      ))}

      <ConeDecoration
        position={new Vector3(0.3, -0.35, 0.3)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, (9 * Math.PI) / 8)}
      />

      <ConeDecoration
        position={new Vector3(-0.3, -0.35, 0.3)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, (7 * Math.PI) / 8)}
      />

      <ConeDecoration
        position={new Vector3(0.3, -0.35, -0.3)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, (9 * Math.PI) / 8)}
      />

      <ConeDecoration
        position={new Vector3(-0.3, -0.35, -0.3)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, (7 * Math.PI) / 8)}
      />

      <ConeDecoration
        position={new Vector3(0.3, 0, 0.5)}
        scale={new Vector3(0.05, 0.3, 0.05)}
        rotation={new Euler(0, 0, -Math.PI / 2)}
      />

      <ConeDecoration
        position={new Vector3(-0.3, 0, 0.5)}
        scale={new Vector3(0.05, 0.3, 0.05)}
        rotation={new Euler(0, 0, Math.PI / 2)}
      />

      <ConeDecoration
        position={new Vector3(0.3, 0.25, 0.5)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, -Math.PI / 4)}
      />

      <ConeDecoration
        position={new Vector3(-0.3, 0.25, 0.5)}
        scale={new Vector3(0.05, 0.5, 0.05)}
        rotation={new Euler(0, 0, Math.PI / 4)}
      />

      <ConeDecoration
        position={new Vector3(0, 0.25, -0.6)}
        scale={new Vector3(0.05, 0.4, 0.05)}
        rotation={new Euler(-Math.PI / 4, 0, 0)}
      />
    </mesh>
  );
};
