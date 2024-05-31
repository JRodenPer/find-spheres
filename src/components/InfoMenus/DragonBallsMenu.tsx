import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSpheresStore } from "../../hooks/useStore";
import * as images from "../../images/images";

interface IDragonBall {
  id: string;
  texture: string;
}

export const DragonBallsMenu: React.FC = () => {
  const [dragonBalls, setDragonBalls] = useState<IDragonBall[]>(
    Array(7).fill({})
  );
  const [lastPicked] = useSpheresStore((state) => [state.lastPicked]);

  useEffect(() => {
    const addDragonBall = (stars: number) => {
      const newDragonBall: IDragonBall = {
        id: nanoid(),
        texture: `ball${stars}Img`,
      };
      const currentDragonBalls = [...dragonBalls];
      currentDragonBalls[stars - 1] = newDragonBall;
      setDragonBalls(currentDragonBalls);
    };
    addDragonBall(lastPicked);
  }, [lastPicked]);

  return (
    <div className="dragon-balls-menu">
      {dragonBalls
        .filter((dragonBall) => dragonBall.id)
        .map((dragonBall, index) => (
          <div
            className={"dragon-ball-menu-item"}
            key={dragonBall.id}
            hidden={Object.keys(dragonBall).length === 0}
          >
            <div className="dragon-ball-image-container">
              <img
                src={(images as any)[dragonBall.texture]}
                alt={`ball${index + 1}`}
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
