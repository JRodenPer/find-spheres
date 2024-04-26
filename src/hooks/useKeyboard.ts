import { useState, useEffect } from "react";

type ActionsKeyboardMap = {
  [key: string]: string;
};

const ACTIONS_KEYBOARD_MAP: ActionsKeyboardMap = {
  KeyW: "moveForward",
  KeyS: "moveBackward",
  KeyD: "moveRight",
  KeyA: "moveLeft",
  Space: "jump",
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];
      console.log(action);
      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: true,
        }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event;
      console.log(code);
      const action = ACTIONS_KEYBOARD_MAP[code];
      if (action) {
        setActions((prevActions) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  return actions;
};
