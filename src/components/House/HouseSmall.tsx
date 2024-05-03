import { nanoid } from "nanoid";
import { Mesh } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Door, Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: [number, number, number][] = [
  [-0.55, 0.3, 1],
  [0, 0.65, 1],
  [0.55, 0.3, 1],
];

const SCALE: [number, number, number] = [0.15, 0.15, 0.15];

interface HouseProps {
  position: [number, number, number];
}

export const HouseSmall = ({ position }: HouseProps) => {
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position[0], position[1] + halfHeight, position[2]],
    args: [1],
    mass: 1,
  }));

  return (
    <mesh receiveShadow castShadow ref={ref as React.MutableRefObject<Mesh>}>
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
        position={[0.8, 1, 0.4]}
        scale={[0.15, 1, 0.15]}
        rotation={[0, 0, -Math.PI / 4]}
      />

      <ConeDecoration position={[0, 1, 0.4]} scale={[0.15, 1, 0.15]} />

      <ConeDecoration
        position={[-0.8, 1, 0.4]}
        scale={[0.15, 1, 0.15]}
        rotation={[0, 0, Math.PI / 4]}
      />

      <Door position={[0, -0.2, 1.4]} scale={0.7} />
    </mesh>
  );
};