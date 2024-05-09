import { Mesh } from "three";
import { useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";
import textures from "../../images/textures";
import { useSpheresStore } from "../../hooks/useStore";
import { ThreeEvent } from "@react-three/fiber";

interface DragonBallProps {
  position: [number, number, number];
  stars: number;
}

export const DragonBall = ({ position, stars }: DragonBallProps) => {
  const halfHeight = 0.05;
  const [ref] = useBox(() => ({
    type: "Static",
    position: [position[0], position[1] + halfHeight + 10, position[2]],
    scale: [0.1, 0.1, 0.1],
  }));

  const [isHovered, setIsHovered] = useState(false);
  const [texture, setTexture] = useState(textures.ball1Texture);
  const [pickSphere] = useSpheresStore((state) => [state.pickSphere]);

  useEffect(() => {
    const textureName = `ball${stars}Texture`;
    const currentTexture = textures[textureName];
    setTexture(currentTexture);
  }, []);

  const handleOnClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    pickSphere(stars);
  };

  return (
    <mesh
      castShadow
      ref={ref as React.MutableRefObject<Mesh>}
      onClick={handleOnClick}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <sphereGeometry args={[10.05, 24, 24]} attach="geometry" />
      <meshStandardMaterial
        map={texture}
        attach="material"
        color={isHovered ? "grey" : "white"}
        metalness={0}
        roughness={0}
      />
    </mesh>
  );
};
