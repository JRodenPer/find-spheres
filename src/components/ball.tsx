import { useEffect, useState } from "react";
import { useBox } from "@react-three/cannon";
import textures from "../images/textures";
import { Mesh } from "three";

interface BallProps {
  position: [number, number, number];
  stars: number;
}

export const Ball = ({ position, stars }: BallProps) => {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
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
