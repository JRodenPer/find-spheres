import { nanoid } from "nanoid";
import { Mesh } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: [number, number, number][] = [
  [0, 0, 0.5],
  [-0.15, -0.1, 0.45],
  [0.15, -0.1, 0.45],
];

const SCALE: [number, number, number][] = [
  [0.15, 0.15, 0.15],
  [0.1, 0.1, 0.1],
  [0.1, 0.1, 0.1],
];

interface ShipNamekProps {
  position: [number, number, number];
}

export const ShipNamek = ({ position }: ShipNamekProps) => {
  const halfHeight = 0.5;

  const [ref] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position: [position[0], position[1] + halfHeight, position[2]],
    args: [1],
  }));

  return (
    <mesh receiveShadow castShadow ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[0.4, 0.4, 0.6]}
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
        scale={[0.2, 0.2, 0.4]}
        position={[0, 0.3, 0]}
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
        position={[0.3, -0.35, 0.3]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, (9 * Math.PI) / 8]}
      />

      <ConeDecoration
        position={[-0.3, -0.35, 0.3]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, (7 * Math.PI) / 8]}
      />

      <ConeDecoration
        position={[0.3, -0.35, -0.3]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, (9 * Math.PI) / 8]}
      />

      <ConeDecoration
        position={[-0.3, -0.35, -0.3]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, (7 * Math.PI) / 8]}
      />

      <ConeDecoration
        position={[0.3, 0, 0.5]}
        scale={[0.05, 0.3, 0.05]}
        rotation={[0, 0, -Math.PI / 2]}
      />

      <ConeDecoration
        position={[-0.3, 0, 0.5]}
        scale={[0.05, 0.3, 0.05]}
        rotation={[0, 0, Math.PI / 2]}
      />

      <ConeDecoration
        position={[0.3, 0.25, 0.5]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, -Math.PI / 4]}
      />

      <ConeDecoration
        position={[-0.3, 0.25, 0.5]}
        scale={[0.05, 0.5, 0.05]}
        rotation={[0, 0, Math.PI / 4]}
      />

      <ConeDecoration
        position={[0, 0.25, -0.6]}
        scale={[0.05, 0.4, 0.05]}
        rotation={[-Math.PI / 4, 0, 0]}
      />
    </mesh>
  );
};
