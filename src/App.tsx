import { useEffect, useState } from "react";
import Radar from "./components/DragonBalls/Radar";
import { DragonBallsMenu, HelpMenu } from "./components/InfoMenus";
import { Loading } from "./components/InfoMenus/Loading";
import World from "./components/World";
import { usePlayerStore, useSpheresStore } from "./hooks/useStore";

const App = () => {
  return (
    <>
      <World />
      <DragonBallsMenu />
      <HelpMenu />
      <Loading />
      <Radar />
    </>
  );
};

export default App;
