import { useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";
import textures from "../images/textures";
import { Mesh } from "three";

interface DragonBallProps {
  position: [number, number, number];
  stars: number;
}

export const DragonBall = ({ position, stars }: DragonBallProps) => {
  const halfHeight = 0.05;
  const [ref] = useBox(() => ({
    type: "Static",
    position: [position[0], position[1] + halfHeight, position[2]],
    scale: [0.1, 0.1, 0.1],
  }));

  const [texture, setTexture] = useState(textures.ball1Texture);

  useEffect(() => {
    const textureName = `ball${stars}Texture`;
    const currentTexture = textures[textureName];
    setTexture(currentTexture);
  }, []);

  return (
    <mesh castShadow ref={ref as React.MutableRefObject<Mesh>}>
      <sphereGeometry args={[0.05, 24, 24]} attach="geometry" />
      <meshStandardMaterial
        map={texture}
        attach="material"
        metalness={0}
        roughness={0}
      />
    </mesh>
  );
};
