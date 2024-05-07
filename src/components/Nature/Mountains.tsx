import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  RandodomInfo,
  generateRandomMountainsPos,
  generateRandomPos,
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
import { House, HouseType, Village } from "../Community";
import { ShipCapsule } from "../Ship/ShipCapsule";
import { ShipFreezer } from "../Ship/ShipFreezer";
import { ShipNamek } from "../Ship/ShipNamek";
import { DragonBall } from "../DragonBall";

export const Mountains = () => {
  const [positionsMountain, setPositionsMountain] = useState<RandodomInfo[]>(
    []
  );
  const [positionsDragonBall, setpositionsDragonBall] = useState<
    [number, number][]
  >([]);
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
  }, []);

  let countDB = 0;
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

    return positionsMountain[index].subPositionsItem[subIndex].isDragonBall ? (
      <DragonBall key={nanoid()} position={position} stars={++countDB} />
    ) : (
      <TreeNamek key={nanoid()} position={position} />
    );
  };

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
        </>
      ))}
    </group>
  );
};
