import React, { useEffect, useState } from "react";

export const HelpMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "h" || event.key === "H") setIsVisible(!isVisible);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVisible]);
  return (
    <div hidden={!isVisible} className="help-menu">
      <h1>Help menu</h1>
      <h2>Instructions</h2>
      <p>
        Welcome to Namek, warrior! You have to find the dragon balls. But be
        careful, you can't fly. Freezer is also here with his army and they can
        detect you if you make sudden movements. You can walk, run, jump and
        even jump high against objects in the world, this way you will not
        increase your ki. To make a big jump you just need to run against an
        object.
      </p>

      <p>Don't forget use the radar if you cannot find the spheres!</p>

      <p>Good luck!</p>
      <h2>Game commands</h2>
      <p>Mouse: Control the camera movement </p>
      <p>W: Start / stop walking forward</p>
      <p>S: Start / stop walking backwards</p>
      <p>R: Start / stop runnig</p>
      <p>Space: Jump</p>
      <p>Q: Show / hide radar</p>
      <p>H: Show / hide help menu</p>

      <h1>About</h1>
      <p>
        This game has been developed by J. Rodenper. You can check my portfolio
        in www.rodenper.dev
      </p>
      <p>Thanks for playing!</p>
    </div>
  );
};
