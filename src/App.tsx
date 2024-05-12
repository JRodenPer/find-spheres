import { DragonBallsMenu, HelpMenu } from "./components/InfoMenus";
import { Loading } from "./components/InfoMenus/Loading";
import World from "./components/World";
import { useKeyboard } from "./hooks/useKeyboard";

const App = () => {
  return (
    <>
      <World />
      <DragonBallsMenu />
      <HelpMenu />
      <Loading />
    </>
  );
};

export default App;
