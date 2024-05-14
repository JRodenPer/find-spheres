import { nanoid } from "nanoid";
import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Door, Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: Vector3[] = [
  new Vector3(0, 0.65, 1.85),
  new Vector3(-0.6, 0.45, 1.8),
  new Vector3(0.6, 0.45, 1.8),
  new Vector3(1.6, 0.45, 1.6),
  new Vector3(-1.6, 0.45, 1.6),
  new Vector3(0.8, 1.75, 0),
  new Vector3(-0.8, 1.75, 0.7),
  new Vector3(-3.4, 0, -0.4),
  new Vector3(3.4, 0, 0),
  new Vector3(3.4, 0, -0.4),
  new Vector3(-3.4, 0, 0.4),
];

const SCALE: Vector3 = new Vector3(0.15, 0.15, 0.15);
interface HouseProps {
  position: Vector3;
}

export const HouseBig = ({ position }: HouseProps) => {
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y + halfHeight, position.z],
    args: [3],
  }));

  return (
    <mesh ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[2, 2, 2]}
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
        position={[1.5, 0, 0]}
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[2, 1.5, 1.7]}
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
        position={[-1.5, 0, 0]}
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[2, 1.5, 1.7]}
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
        position={[0, 1.5, 0.3]}
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[1, 1, 1]}
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

      <Skylight
        position={new Vector3(0, 1.75, 1.1)}
        scale={new Vector3(0.25, 0.25, 0.25)}
        color={"#008B8B"}
      />

      <ConeDecoration
        position={new Vector3(0.8, 2.4, 0.4)}
        scale={new Vector3(0.25, 1, 0.25)}
        rotation={new Euler(0, 0, -Math.PI / 4)}
      />

      <ConeDecoration
        position={new Vector3(-0.8, 2.4, 0.4)}
        scale={new Vector3(0.25, 1, 0.25)}
        rotation={new Euler(0, 0, Math.PI / 4)}
      />

      <Door position={new Vector3(0, -0.2, 1.9)} scale={0.9} />
    </mesh>
  );
};
