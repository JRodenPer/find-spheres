import { Cone, Sphere } from "@react-three/drei";

interface ConeDecorationProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
}

export const ConeDecoration = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = "white",
}: ConeDecorationProps) => {
  return (
    <Cone
      receiveShadow
      castShadow
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <meshStandardMaterial
        attach="material"
        color={color}
        metalness={0}
        roughness={0}
      />
    </Cone>
  );
};
