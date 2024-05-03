import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  RandodomInfo,
  generateRandomMountainsPos,
  generateRandomPos,
} from "../../helper/randomPositionHelper";
import {
  MOUNTAINS_COUNT,
  MOUNTAINS_HEIGHT_MAX,
  MOUNTAINS_HEIGHT_MIN,
  MOUNTAINS_RADIUS_MAX,
  MOUNTAINS_RADIUS_MIN,
  MOUNTAINS_RADIUS_BOTTOM_PERCENT,
  SIZE_GROUND,
  TREE_COUNT,
  HOUSE_COUNT,
  PERCENT_SUB_ITEMS,
} from "../../constants";
import { Mountain } from "./Mountain";
import { TreeNamek } from "./TreeNamek";
import { House, HouseType } from "../House";

export const Mountains = () => {
  const [positions, setPositions] = useState<RandodomInfo[]>([]);
  const [positionsTree, setPositionsTree] = useState<RandodomInfo[]>([]);
  const [positionsHouse, setPositionsHouse] = useState<RandodomInfo[]>([]);
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
    setPositions(items);

    const items3: any = generateRandomPos(
      SIZE_GROUND.SIZE_X,
      SIZE_GROUND.SIZE_Y,
      TREE_COUNT
    );
    setPositionsTree(items);

    const items2: any = generateRandomPos(
      SIZE_GROUND.SIZE_X,
      SIZE_GROUND.SIZE_Y,
      HOUSE_COUNT
    );
    setPositionsHouse(items2);
  }, []);

  return (
    <group>
      {positions.map((item) => (
        <>
          <Mountain
            key={nanoid()}
            position={item.position}
            subPositions={item.subPositions}
            radiusTop={item.radius}
            radiusBottom={item.radius * MOUNTAINS_RADIUS_BOTTOM_PERCENT}
            height={item.height}
          />
          {item.subPositions
            ? item.subPositions.map((subItem) => (
                <House
                  key={nanoid()}
                  type={HouseType.Big}
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
