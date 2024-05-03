import { Sphere } from "@react-three/drei";

interface SkylightProps {
  position: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

export const Skylight = ({
  position,
  scale = [1, 1, 1],
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
