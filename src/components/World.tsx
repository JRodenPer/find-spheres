import { Sky, Stars } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground, Water } from "../components/Nature";
import { FirstPV } from "../components/FirstPV";
import { Player } from "../components/Player";
import { Mountains } from "../components/Nature";
import { DragonBalls } from "./DragonBalls";
import { useEffect, useRef, useState } from "react";
import {
  generateNoiseMap,
  generateTextureFromNoiseMap,
} from "../helper/noiseTextureHelper";
import { SIZE_GROUND } from "../constants";
import Radar from "./DragonBalls/Radar";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

const World = () => {
  const groupRef: any = useRef();

  const [textureGround, setTextureGround] = useState<any>(undefined);
  const [textureWater, setTextureWater] = useState<any>(undefined);

  useEffect(() => {
    const width = 512;
    const height = 512;
    const scale = 100;
    const offsetX = 0;
    const offsetY = 0;
    const noiseMap = generateNoiseMap(width, height, scale, offsetX, offsetY);

    const newTexture = generateTextureFromNoiseMap(noiseMap);
    setTextureGround(newTexture);
  }, []);

  useEffect(() => {
    const noiseMap = generateNoiseMap(5, 5, 10, 0, 0);
    const newTexture = generateTextureFromNoiseMap(noiseMap, "blue", "white");
    setTextureWater(newTexture);
  }, []);

  return (
    <>
      <Canvas shadows>
        <Sky distance={3000} sunPosition={[0, 100, 100]} />
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[0, 100, 100]}
          intensity={1}
          castShadow
          shadow-mapSize-width={18432}
          shadow-mapSize-height={14378}
          shadow-camera-far={500}
          shadow-camera-left={-250}
          shadow-camera-right={250}
          shadow-camera-top={250}
          shadow-camera-bottom={-250}
          color="#ffffff"
        />

        <FirstPV />
        <Physics>
          <Ground texture={textureGround} />
          <Water
            position={[-SIZE_X - 1, -1, 0]}
            size={[SIZE_X * 15, SIZE_Y * 15]}
            texture={textureWater}
          />
          <Player />
          <DragonBalls />
          <Mountains />
        </Physics>
      </Canvas>
      <div className="pointer"> + </div>
    </>
  );
};

export default World;
