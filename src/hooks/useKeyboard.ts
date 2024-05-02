import { useState, useEffect, useRef } from "react";

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
  const [actions, setActions]: any = useState({
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
      console.log("keyDown " + code);
      if (action && !actions[action]) {
        setActions((prevActions: any) => ({
          ...prevActions,
          [action]: true,
        }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event;
      console.log("keyUp " + code);
      const action = ACTIONS_KEYBOARD_MAP[code];
      if (action) {
        setActions((prevActions: any) => ({
          ...prevActions,
          [action]: false,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return actions;
};
/*
export const useKeyboard = () => {
  const [keyState, setKeyState] = useState({});

  const handleKeyDown = (event: KeyboardEvent) => {
    setKeyState((prevKeyState) => ({
      ...prevKeyState,
      [event.code]: true,
    }));
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setKeyState((prevKeyState) => ({
      ...prevKeyState,
      [event.code]: false,
    }));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const actions = Object.keys(ACTIONS_KEYBOARD_MAP).reduce((acc, code) => {
    acc[ACTIONS_KEYBOARD_MAP[code]] = !!keyState[code];
    return acc;
  }, {});

  return actions;
};*/
