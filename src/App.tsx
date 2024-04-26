import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { FirstPV } from "./components/FirstPV";
import { Player } from "./components/Player";
import { Mountain } from "./components/Mountain";
import { House } from "./components/House";
import { HouseBig } from "./components/HouseBig";

function App() {
  return (
    <Canvas>
      <Sky sunPosition={[100, 100, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <FirstPV />
      <Physics>
        <Ground />
        <Player />
        <Mountain position={[1, 0, -2]} />
        <House position={[3, 0, -2]} />
        <HouseBig position={[10, 0, -2]} />
      </Physics>
    </Canvas>
  );
}

export default App;
