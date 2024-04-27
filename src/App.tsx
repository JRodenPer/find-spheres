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
import { Ball } from "./components/ball";
import { HouseMid } from "./components/HouseMid";

function App() {
  return (
    <Canvas shadows>
      <Sky sunPosition={[0, 100, 100]} />
      {<ambientLight intensity={0.5} />}
      {
        <directionalLight
          position={[0, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={9024}
          shadow-mapSize-height={7024}
          shadow-camera-far={50}
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
        <Brick position={[1, 0, -2]} />
        <House position={[3, 0, -2]} />
        <HouseBig position={[10, 0, -2]} />
        <HouseMid position={[15, 0, -2]} />
        <Ship position={[-1, 0, -2]} />
        <ThreeNamek position={[-2, 0, -2]} />
        <HouseBig position={[-20, 0, -20]} />
        <HouseBig position={[-200, 0, 0]} />
        <HouseBig position={[-100, 0, 0]} />
        <Ball position={[1, -0.4, 1]} stars={1} />
        <Ball position={[2, -0.4, 1]} stars={2} />
        <Ball position={[3, -0.4, 1]} stars={3} />
        <Ball position={[4, -0.4, 1]} stars={4} />
        <Ball position={[5, -0.4, 1]} stars={5} />
        <Ball position={[6, -0.4, 1]} stars={6} />
        <Ball position={[7, -0.4, 1]} stars={7} />
      </Physics>
    </Canvas>
  );
}

export default App;
