import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground } from "../components/Nature";
import { FirstPV } from "../components/FirstPV";
import { Player } from "../components/Player";
import { Mountains } from "../components/Nature";
import { DragonBalls } from "./DragonBalls";

const World = () => {
  return (
    <>
      <Canvas shadows>
        <Sky distance={3000} sunPosition={[0, 100, 100]} />
        {<ambientLight intensity={0.7} />}
        {
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
        }

        <FirstPV />
        <Physics>
          <Ground />
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
