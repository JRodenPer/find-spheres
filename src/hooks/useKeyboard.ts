import { useState, useEffect } from "react";

type ActionsKeyboardMap = {
  [key: string]: string;
};

const ACTIONS_KEYBOARD_MAP: ActionsKeyboardMap = {
  KeyW: "walk",
  KeyS: "walkBack",
  KeyR: "run",
  Space: "jump",
};

export const useKeyboard = () => {
  const [actions, setActions]: any = useState({
    walk: false,
    walkBack: false,
    run: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];
      if (action === ACTIONS_KEYBOARD_MAP.Space && !actions[action]) {
        setActions((prevActions: any) => ({
          ...prevActions,
          [action]: true,
        }));
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event;
      const action = ACTIONS_KEYBOARD_MAP[code];
      if (action) {
        action === ACTIONS_KEYBOARD_MAP.Space
          ? setActions((prevActions: any) => ({
              ...prevActions,
              [action]: false,
            }))
          : setActions((prevActions: any) => ({
              jump: false,
              walk:
                action === ACTIONS_KEYBOARD_MAP.KeyW
                  ? !prevActions[action]
                  : false,
              walkBack:
                action === ACTIONS_KEYBOARD_MAP.KeyS
                  ? !prevActions[action]
                  : false,
              run:
                action === ACTIONS_KEYBOARD_MAP.KeyR
                  ? !prevActions[action]
                  : false,
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
