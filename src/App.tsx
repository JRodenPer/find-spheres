import Radar from "./components/DragonBalls/Radar";
import { DragonBallsMenu, HelpMenu, Winner } from "./components/InfoMenus";
import { Loading } from "./components/InfoMenus/Loading";
import { TimerMenu } from "./components/InfoMenus/TimerMenu";
import World from "./components/World";
import { useSpheresStore } from "./hooks/useStore";

const App = () => {
  const [win] = useSpheresStore((state) => [state.win]);
  return (
    <>
      <World />
      <DragonBallsMenu />
      <TimerMenu />
      <HelpMenu />
      <Loading />
      <Winner />
      {win ? null : <Radar />}
    </>
  );
};

export default App;
