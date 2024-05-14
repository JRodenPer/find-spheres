import { Sphere } from "@react-three/drei";
import { Vector3 } from "three";

interface SkylightProps {
  position: Vector3;
  scale?: Vector3;
  color?: string;
}

export const Skylight = ({
  position,
  scale = new Vector3(1, 1, 1),
  color = "cyan",
}: SkylightProps) => {
  return (
    <Sphere receiveShadow castShadow position={position} scale={scale}>
      <meshStandardMaterial
        attach="material"
        color={color}
        metalness={0}
        roughness={0}
      />
    </Sphere>
  );
};
