import { Cone } from "@react-three/drei";
import { Euler, Vector3 } from "three";

interface ConeDecorationProps {
  position: Vector3;
  rotation?: Euler;
  scale?: Vector3;
  color?: string;
}

export const ConeDecoration = ({
  position,
  rotation = new Euler(0, 0, 0),
  scale = new Vector3(1, 1, 1),
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
