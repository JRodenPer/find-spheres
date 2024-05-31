import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground, Water } from "../components/Nature";
import { FirstPV } from "../components/FirstPV";
import { Player } from "../components/Player";
import { Mountains } from "../components/Nature";
import { DragonBalls } from "./DragonBalls";
import {
  generateNoiseMap,
  generateTextureFromNoiseMap,
} from "../helper/noiseTextureHelper";
import { SIZE_GROUND } from "../constants";
import { Vector2, Vector3 } from "three";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

const noiseMapGround = generateNoiseMap(512, 512, 100);
const textureGround = generateTextureFromNoiseMap(noiseMapGround);

const noiseMapWater = generateNoiseMap(5, 5, 10);
const textureWater = generateTextureFromNoiseMap(
  noiseMapWater,
  "blue",
  "white"
);

const World = () => {
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
            position={new Vector3(-SIZE_X - 1, -1, 0)}
            size={new Vector2(SIZE_X * 15, SIZE_Y * 15)}
            texture={textureWater}
          />
          <Player />
          <Mountains />
          <DragonBalls />
        </Physics>
      </Canvas>
      <div className="pointer"> + </div>
    </>
  );
};

export default World;
