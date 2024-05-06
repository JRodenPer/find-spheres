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

export const Mountains = () => {
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
  }, []);

  return (
    <group>
      {positionsMountain.map((item) => (
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
          {item.subPositionsTree
            ? item.subPositionsTree.map((subItem) => (
                <TreeNamek
                  key={nanoid()}
                  position={[subItem[0], item.position[1] * 2, subItem[1]]}
                />
              ))
            : null}
        </>
      ))}
      {/*positions.map((item, index) => (
        <TreeNamek key={index} position={[item[0], 0 / 2, item[1]]} />
      ))
      {positionsTree.map((item, index) => (
        <TreeNamek key={index} position={[item[0], 0 / 2, item[1]]} />
      ))}
      {positionsHouse.map((item, index) => (
        <House key={index} position={[item[0], 0 / 2, item[1]]} />
      ))}*/}
    </group>
  );
};
