import { Euler, Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import textures from "../../images/textures";
import { ShipFreezerSupport } from "./ShipFreezerSupport";
import { Skylight } from "../Accesories";

interface ShipProps {
  position: Vector3;
}

export const ShipFreezer = ({ position }: ShipProps) => {
  const shipCapsuleSupportHeight = 0.4;
  const halfHeight = 0.5;

  const [ref] = useSphere(() => ({
    type: "Static",
    position: [
      position.x,
      position.y + halfHeight + shipCapsuleSupportHeight / 2,
      position.z,
    ],
    args: [5],
  }));

  return (
    <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        scale={[5, 1, 5]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          attach="material"
          map={textures.shipFreezerTexture}
          metalness={0}
          roughness={0}
        />
      </Sphere>

      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, 0, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, Math.PI / 6, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, Math.PI / 3, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, (2 * Math.PI) / 3, 0)}
        separator={false}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, (5 * Math.PI) / 6, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, -Math.PI / 6, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, -Math.PI / 3, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, -(2 * Math.PI) / 3, 0)}
      />
      <ShipFreezerSupport
        position={new Vector3(0, 0, 0)}
        rotation={new Euler(0, -(5 * Math.PI) / 6, 0)}
      />

      <Skylight
        position={new Vector3(0, 0.25, 3.9)}
        scale={new Vector3(0.9, 0.5, 0.9)}
        color={"purple"}
      />
      <Skylight
        position={new Vector3(-0.7, 0.0, 4.7)}
        scale={new Vector3(0.2, 0.2, 0.3)}
      />
      <Skylight
        position={new Vector3(0.7, 0.0, 4.7)}
        scale={new Vector3(0.2, 0.2, 0.3)}
      />
    </mesh>
  );
};
