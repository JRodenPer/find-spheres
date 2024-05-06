import { nanoid } from "nanoid";
import { Mesh } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { Door, Skylight, ConeDecoration } from "../Accesories";

const POSITIONS: [number, number, number][] = [
  [0, 0.65, 1.85],
  [-0.6, 0.45, 1.8],
  [0.6, 0.45, 1.8],
  [1.6, 0.45, 1.6],
  [-1.6, 0.45, 1.6],
  [0.8, 1.75, 0.7],
  [-0.8, 1.75, 0.7],
  [-3.4, 0, -0.4],
  [3.4, 0, 0.4],
  [3.4, 0, -0.4],
  [-3.4, 0, 0.4],
];

const SCALE: [number, number, number] = [0.15, 0.15, 0.15];
interface HouseProps {
  position: [number, number, number];
}

export const HouseBig = ({ position }: HouseProps) => {
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position[0], position[1] + halfHeight, position[2]],
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
        position={[0, 1.75, 1.1]}
        scale={[0.25, 0.25, 0.25]}
        color={"#008B8B"}
      />

      <ConeDecoration
        position={[0.8, 2.4, 0.4]}
        scale={[0.25, 1, 0.25]}
        rotation={[0, 0, -Math.PI / 4]}
      />

      <ConeDecoration
        position={[-0.8, 2.4, 0.4]}
        scale={[0.25, 1, 0.25]}
        rotation={[0, 0, Math.PI / 4]}
      />

      <Door position={[0, -0.2, 1.9]} scale={0.9} />
    </mesh>
  );
};
