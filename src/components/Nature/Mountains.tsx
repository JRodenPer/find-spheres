import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  RandodomInfo,
  generateRandomMountainsPos,
  getRandomNumber,
} from "../../helper/randomPositionHelper";
import {
  MOUNTAINS_COUNT,
  MOUNTAINS_HEIGHT_MAX,
  MOUNTAINS_HEIGHT_MIN,
  MOUNTAINS_RADIUS_MAX,
  MOUNTAINS_RADIUS_MIN,
  MOUNTAINS_RADIUS_BOTTOM_PERCENT,
  SIZE_GROUND,
  HOUSE_COUNT,
  PERCENT_SUB_ITEMS,
} from "../../constants";
import { Mountain } from "./Mountain";
import { TreeNamek } from "./TreeNamek";
import { Village } from "../Community";
import { ShipCapsule } from "../Ship/ShipCapsule";
import { ShipFreezer } from "../Ship/ShipFreezer";
import { ShipNamek } from "../Ship/ShipNamek";
import { useMountainsStore } from "../../hooks/useStore";
import React from "react";

export const Mountains = React.memo(() => {
  const [addPositionsMountain] = useMountainsStore((state) => [
    state.addPositionsMountain,
  ]);
  const [positionsMountain, setPositionsMountain] = useState<RandodomInfo[]>(
    []
  );

  useEffect(() => {
    const items: RandodomInfo[] = generateRandomMountainsPos(
      SIZE_GROUND.SIZE_X,
      SIZE_GROUND.SIZE_Y,
      MOUNTAINS_COUNT,
      PERCENT_SUB_ITEMS,
      MOUNTAINS_RADIUS_MIN,
      MOUNTAINS_RADIUS_MAX,
      MOUNTAINS_HEIGHT_MIN,
      MOUNTAINS_HEIGHT_MAX
    );
    setPositionsMountain(items);
    addPositionsMountain(items);

    console.log("render mountains");
  }, []);

  const renderSubItem = (
    position: [number, number, number],
    index: number,
    subIndex: number
  ) => {
    if (index === 0) {
      switch (subIndex) {
        case 0:
          return <ShipCapsule key={nanoid()} position={position} />;
        case 1:
          return <ShipFreezer key={nanoid()} position={position} />;
        case 2:
          return <ShipNamek key={nanoid()} position={position} />;
        default:
          break;
      }
    }

    const addDragonBall =
      positionsMountain[index].subPositionsItem[subIndex].isDragonBall;

    return addDragonBall ? null : (
      <TreeNamek key={nanoid()} position={position} />
    );
  };

  /*useEffect(() => {
    console.log("El componente Mountains se ha renderizado");
  });*/

  return (
    <group>
      {positionsMountain.map((item, indexMountain) => (
        <>
          <Mountain
            key={nanoid()}
            position={item.position}
            radiusTop={item.radius}
            radiusBottom={item.radius * MOUNTAINS_RADIUS_BOTTOM_PERCENT}
            height={item.height}
          />
          {item.subPositionsVillage
            ? item.subPositionsVillage.map((subItem) => (
                <Village
                  key={nanoid()}
                  position={[subItem[0], item.position[1] * 2, subItem[1]]}
                  housesCount={getRandomNumber(HOUSE_COUNT, 10)}
                />
              ))
            : null}
          {item.subPositionsItem
            ? item.subPositionsItem.map((subItem, index) =>
                renderSubItem(
                  [
                    subItem.position[0],
                    item.position[1] * 2 + 0.1,
                    subItem.position[1],
                  ],
                  indexMountain,
                  index
                )
              )
            : null}
          <Mountain
            position={[
              -1.5 * SIZE_GROUND.SIZE_Y,
              20,
              -1.5 * SIZE_GROUND.SIZE_Y,
            ]}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={[-1.5 * SIZE_GROUND.SIZE_Y, 20, 1.5 * SIZE_GROUND.SIZE_Y]}
            radiusBottom={400}
            radiusTop={100}
            height={40}
          />
          <Mountain
            position={[1.5 * SIZE_GROUND.SIZE_Y, 20, -2 * SIZE_GROUND.SIZE_Y]}
            radiusBottom={400}
            radiusTop={100}
            height={40}
          />
          <Mountain
            position={[1.5 * SIZE_GROUND.SIZE_Y, 20, 1.5 * SIZE_GROUND.SIZE_Y]}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={[-2 * SIZE_GROUND.SIZE_Y, 20, 0]}
            radiusBottom={400}
            radiusTop={100}
            height={40}
          />
          <Mountain
            position={[0, 20, 2 * SIZE_GROUND.SIZE_Y]}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={[2 * SIZE_GROUND.SIZE_Y, 20, 0]}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={[0, 20, -2 * SIZE_GROUND.SIZE_Y]}
            radiusBottom={400}
            radiusTop={100}
            height={40}
          />
        </>
      ))}
    </group>
  );
});
