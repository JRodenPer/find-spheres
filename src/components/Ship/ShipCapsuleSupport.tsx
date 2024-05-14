import { Mesh, Vector3 } from "three";
import { useSphere } from "@react-three/cannon";
import { Cylinder, Sphere } from "@react-three/drei";

interface ShipProps {
  position: Vector3;
}

export const ShipCapsuleSupport = ({ position }: ShipProps) => {
  const [ref] = useSphere(() => ({
    type: "Static",
    position: [position.x, position.y, position.z],
    args: [1],
  }));

  return (
    <mesh ref={ref as React.MutableRefObject<Mesh>}>
      <Cylinder
        receiveShadow
        castShadow
        scale={[0.03, 0.2, 0.03]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <meshStandardMaterial
          attach="material"
          color={"#F6F6F6"}
          metalness={0}
          roughness={0}
        />
      </Cylinder>

      <Sphere
        receiveShadow
        castShadow
        args={[1, 64, 64, Math.PI, 2 * Math.PI, 0, Math.PI]}
        position={new Vector3(0, -0.1, 0)}
        scale={new Vector3(0.1, 0.01, 0.1)}
      >
        <meshStandardMaterial
          attach="material"
          color={"#F6F6F6"}
          metalness={0}
          roughness={0}
        />
      </Sphere>
    </mesh>
  );
};
