import { DragonBallsMenu, HelpMenu } from "./components/InfoMenus";
import World from "./components/World";
import { useKeyboard } from "./hooks/useKeyboard";

const App = () => {
  return (
    <>
      <World />
      <DragonBallsMenu />
      <HelpMenu />
    </>
  );
};

export default App;
