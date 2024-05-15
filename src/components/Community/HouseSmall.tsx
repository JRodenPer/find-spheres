import { nanoid } from "nanoid";
import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Door, Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: Vector3[] = [
  new Vector3(-0.55, 0.3, 1),
  new Vector3(0, 0.65, 1),
  new Vector3(0.55, 0.3, 1),
];

const SCALE: Vector3 = new Vector3(0.15, 0.15, 0.15);

interface HouseProps {
  position: Vector3;
}

export const HouseSmall = ({ position }: HouseProps) => {
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y + halfHeight, position.z],
    args: [1],
    mass: 1,
  }));

  return (
    <mesh ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[1, 1, 1.5]}
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

      <ConeDecoration
        position={new Vector3(0.8, 1, 0.4)}
        scale={new Vector3(0.15, 1, 0.15)}
        rotation={new Euler(0, 0, -Math.PI / 4)}
      />

      <ConeDecoration
        position={new Vector3(0, 1, 0.4)}
        scale={new Vector3(0.15, 1, 0.15)}
      />

      <ConeDecoration
        position={new Vector3(-0.8, 1, 0.4)}
        scale={new Vector3(0.15, 1, 0.15)}
        rotation={new Euler(0, 0, Math.PI / 4)}
      />

      <Door position={new Vector3(0, -0.2, 1.4)} scale={0.7} />
    </mesh>
  );
};
