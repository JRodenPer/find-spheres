import React, { useEffect, useState } from "react";
import { useLoadingStore } from "../../hooks/useStore";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const RotatingSphere = () => {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Actualiza la rotación en cada frame
  useFrame(() => {
    setRotation([rotation[0] + 0.01, rotation[1] + 0.01, rotation[2]]);
  });

  return (
    <Sphere args={[1, 32, 32]}>
      <meshPhongMaterial attach="material" color="red" />
      <mesh rotation={rotation} />
    </Sphere>
  );
};

export const Loading: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading] = useLoadingStore((state) => [state.loading]);

  useEffect(() => {
    setIsVisible(loading);
  }, [loading]);
  return (
    <div hidden={!isVisible} className="loading-container">
      <div hidden={!isVisible} className="loading">
        <h1>LOADING...</h1>
        <div className="dragon-balls-loading-container">
          <div className="ball1"></div>
          <div className="ball2"></div>
          <div className="ball3"></div>
          <div className="ball4"></div>
          <div className="ball5"></div>
          <div className="ball6"></div>
          <div className="ball7"></div>
        </div>
      </div>
    </div>
  );
};
