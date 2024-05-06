import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground, Mountain } from "../components/Nature";
import { FirstPV } from "../components/FirstPV";
import { Player } from "../components/Player";
import { Mountains } from "../components/Nature";
import { useStore } from "../hooks/useStore";
import { SIZE_GROUND } from "../constants";

const World = () => {
  const [positions] = useStore((state) => [state.positions]);
  return (
    <Canvas shadows>
      <Sky sunPosition={[0, 100, 100]} />
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
        <Mountains />
        {/* <HouseBig
          position={[
            0,
            positions[SIZE_GROUND.SIZE_X / 2][SIZE_GROUND.SIZE_Y / 2],
            0,
          ]}
        />*/}
        {/*<House position={[0, 33.1, 0]} />
        <HouseBig position={[10, 60.1, -2]} />
        <HouseMid position={[15, 60.1, -2]} />
        <Ship position={[-1, 60.1, -2]} />
        <ShipCapsule position={[-10, 60.1, -4]} />
        <ShipFreezer position={[-1, 60.1, -10]} />
        <TreeNamek position={[-2, 60.1, -2]} />
        <HouseBig position={[-20, 60.1, -20]} />
        <HouseBig position={[-200, 60.1, 0]} />
        <HouseBig position={[-100, 60.1, 0]} />
        <DragonBall position={[1, 60.1, 10]} stars={1} />
        <DragonBall position={[2, 60.1, 10]} stars={2} />
        <DragonBall position={[3, 60.1, 10]} stars={3} />
        <DragonBall position={[4, 60.1, 10]} stars={4} />
        <DragonBall position={[5, 60.1, 10]} stars={5} />
        <DragonBall position={[6, 60.1, 10]} stars={6} />
    <DragonBall position={[7, 60.1, 10]} stars={7} />*/}
        {/*<Mountain
          position={[40, 0, -40]}
          radiusBottom={110}
          radiusTop={100}
          height={50}
        />
        <Mountain
          position={[0, 0, -70]}
          radiusBottom={110}
          radiusTop={100}
          height={40}
        />
        <Mountain
          position={[0, 2.5, 0]}
          radiusBottom={11}
          radiusTop={10}
          height={5}
          subPositions={[]}
        />*/}
        <Mountain
          position={[-3 * SIZE_GROUND.SIZE_Y, 200, -3 * SIZE_GROUND.SIZE_Y]}
          radiusBottom={400}
          radiusTop={10}
          height={400}
        />
        {/*<ShipCapsule position={[-5, 60.1, 0]} />
        <TreeNamek position={[-2, 60.1, -2]} />*/}
      </Physics>
    </Canvas>
  );
};

export default World;
