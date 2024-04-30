import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { FirstPV } from "./components/FirstPV";
import { Player } from "./components/Player";
import { Brick } from "./components/Brick";
import { House } from "./components/House";
import { HouseBig } from "./components/HouseBig";
import { Ship } from "./components/Ship";
import { ThreeNamek } from "./components/ThreeNamek";
import { DragonBall } from "./components/DragonBall";
import { HouseMid } from "./components/HouseMid";
import { ShipCapsule } from "./components/ShipCapsule";
import { ShipFreezer } from "./components/ShipFreezer";
import { Mountain } from "./components/Mountain";

function App() {
  return (
    <Canvas shadows>
      <Sky sunPosition={[0, 100, 100]} />
      {<ambientLight intensity={0.5} />}
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
        <House position={[3, 60.1, -2]} />
        <HouseBig position={[10, 60.1, -2]} />
        <HouseMid position={[15, 60.1, -2]} />
        <Ship position={[-1, 60.1, -2]} />
        <ShipCapsule position={[-10, 60.1, -4]} />
        <ShipFreezer position={[-1, 60.1, -10]} />
        <ThreeNamek position={[-2, 60.1, -2]} />
        <HouseBig position={[-20, 60.1, -20]} />
        <HouseBig position={[-200, 60.1, 0]} />
        <HouseBig position={[-100, 60.1, 0]} />
        <DragonBall position={[1, 60.1, 10]} stars={1} />
        <DragonBall position={[2, 60.1, 10]} stars={2} />
        <DragonBall position={[3, 60.1, 10]} stars={3} />
        <DragonBall position={[4, 60.1, 10]} stars={4} />
        <DragonBall position={[5, 60.1, 10]} stars={5} />
        <DragonBall position={[6, 60.1, 10]} stars={6} />
        <DragonBall position={[7, 60.1, 10]} stars={7} />
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
        />*/}
        <Mountain
          position={[0, 30, -30]}
          radiusBottom={110}
          radiusTop={100}
          height={60}
        />

        {/*<Mountain
          position={[500, 250, -100]}
          radiusBottom={510}
          radiusTop={10}
          height={500}
        />
        <Mountain
          position={[600, 350, -100]}
          radiusBottom={510}
          radiusTop={10}
          height={700}
      />
        <ShipCapsule position={[-5, 60.1, 0]} />
        <ThreeNamek position={[-2, 60.1, -2]} />*/}
      </Physics>
    </Canvas>
  );
}

export default App;
