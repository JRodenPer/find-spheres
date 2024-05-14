import { nanoid } from "nanoid";
import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Cylinder, Sphere } from "@react-three/drei";
import textures from "../../images/textures";
import { ShipCapsuleSupport } from "./ShipCapsuleSupport";
import { Door, Skylight } from "../Accesories";

const POSITIONS: Vector3[] = [
  new Vector3(-0.5, -0.25, 0),
  new Vector3(-0.3, -0.25, 0.4),
  new Vector3(-0.3, -0.25, -0.4),
  new Vector3(0.5, -0.25, 0),
  new Vector3(0.3, -0.25, 0.4),
  new Vector3(0.3, -0.25, -0.4),
];

const SCALE: Vector3 = new Vector3(0.1, 0.1, 0.1);
interface ShipProps {
  position: Vector3;
}

export const ShipCapsule = ({ position }: ShipProps) => {
  const shipCapsuleSupportHeight = 0.4;
  const halfHeight = 0.5;
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [
      position.x,
      position.y + halfHeight + shipCapsuleSupportHeight / 2,
      position.z,
    ],
    args: [1],
  }));

  return (
    <mesh ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[0.6, 0.6, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          attach="material"
          map={textures.capsuleTexture}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      <Cylinder
        receiveShadow
        castShadow
        position={new Vector3(0, -0.5, 0)}
        scale={new Vector3(0.6, 0.01, 0.1)}
        rotation={new Euler(0, Math.PI / 4, 0)}
      >
        <meshStandardMaterial
          attach="material"
          color={"#F6F6F6"}
          metalness={0}
          roughness={0}
        />
      </Cylinder>

      <Cylinder
        receiveShadow
        castShadow
        position={new Vector3(0, -0.5, 0)}
        scale={new Vector3(0.6, 0.01, 0.1)}
        rotation={new Euler(0, -Math.PI / 4, 0)}
      >
        <meshStandardMaterial
          attach="material"
          color={"#F6F6F6"}
          metalness={0}
          roughness={0}
        />
      </Cylinder>
      <ShipCapsuleSupport position={new Vector3(-0.4, -0.6, -0.4)} />
      <ShipCapsuleSupport position={new Vector3(-0.4, -0.6, 0.4)} />
      <ShipCapsuleSupport position={new Vector3(0.4, -0.6, 0.4)} />
      <ShipCapsuleSupport position={new Vector3(0.4, -0.6, -0.4)} />

      <Door
        position={new Vector3(0.0, -0.15, 0.51)}
        scale={0.45}
        window={false}
        rotation={new Euler(Math.PI / 8, 0, 0)}
        color={"#F6F6F6"}
        colorBorder={"#000850"}
      />

      {POSITIONS.map((pos) => (
        <Skylight key={nanoid()} position={pos} scale={SCALE} />
      ))}
    </mesh>
  );
};
