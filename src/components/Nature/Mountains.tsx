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
  TREE_HEIGHT_MAX,
  TREE_HEIGHT_MIN,
} from "../../constants";
import { Mountain } from "./Mountain";
import { TreeNamek } from "./TreeNamek";
import { Village } from "../Community";
import { ShipCapsule } from "../Ship/ShipCapsule";
import { ShipFreezer } from "../Ship/ShipFreezer";
import { ShipNamek } from "../Ship/ShipNamek";
import { useMountainsStore } from "../../hooks/useStore";
import React from "react";
import { Vector3 } from "three";

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
      MOUNTAINS_HEIGHT_MAX,
      MOUNTAINS_HEIGHT_MIN
    );
    setPositionsMountain(items);
    addPositionsMountain(items);
  }, [addPositionsMountain]);

  const renderSubItem = (
    position: Vector3,
    index: number,
    subIndex: number
  ) => {
    if (index === 0) {
      switch (subIndex) {
        case 0:
          return <ShipCapsule key={subIndex} position={position} />;
        case 1:
          return <ShipFreezer key={subIndex} position={position} />;
        case 2:
          return <ShipNamek key={subIndex} position={position} />;
        default:
          break;
      }
    }

    const addDragonBall =
      positionsMountain[index].subPositionsItem[subIndex].isDragonBall;

    return addDragonBall ? null : (
      <TreeNamek
        key={subIndex}
        position={position}
        height={getRandomNumber(TREE_HEIGHT_MAX, TREE_HEIGHT_MIN, false)}
      />
    );
  };

  return (
    <group>
      {positionsMountain.map((item, indexMountain) => (
        <React.Fragment key={indexMountain}>
          <Mountain
            key={indexMountain}
            position={item.position}
            radiusTop={item.radius}
            radiusBottom={item.radius * MOUNTAINS_RADIUS_BOTTOM_PERCENT}
            height={item.height}
          />
          {item.subPositionsVillage
            ? item.subPositionsVillage.map((subItem, index) => (
                <Village
                  key={index}
                  position={
                    new Vector3(subItem.x, item.position.y * 2, subItem.y)
                  }
                  housesCount={getRandomNumber(HOUSE_COUNT, 10)}
                />
              ))
            : null}
          {item.subPositionsItem
            ? item.subPositionsItem.map((subItem, index) =>
                renderSubItem(
                  new Vector3(
                    subItem.position.x,
                    item.position.y * 2 + 0.1,
                    subItem.position.y
                  ),
                  indexMountain,
                  index
                )
              )
            : null}
          <Mountain
            position={
              new Vector3(
                -1.5 * SIZE_GROUND.SIZE_Y,
                20,
                -1.5 * SIZE_GROUND.SIZE_Y
              )
            }
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={
              new Vector3(
                -1.5 * SIZE_GROUND.SIZE_Y,
                20,
                1.5 * SIZE_GROUND.SIZE_Y
              )
            }
            radiusBottom={400}
            radiusTop={100}
            height={40}
          />
          <Mountain
            position={
              new Vector3(1.5 * SIZE_GROUND.SIZE_Y, 40, -2 * SIZE_GROUND.SIZE_Y)
            }
            radiusBottom={400}
            radiusTop={100}
            height={80}
          />
          <Mountain
            position={
              new Vector3(
                1.5 * SIZE_GROUND.SIZE_Y,
                20,
                1.5 * SIZE_GROUND.SIZE_Y
              )
            }
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={new Vector3(-2 * SIZE_GROUND.SIZE_Y, 40, 0)}
            radiusBottom={400}
            radiusTop={100}
            height={80}
          />
          <Mountain
            position={new Vector3(0, 20, 2 * SIZE_GROUND.SIZE_Y)}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={new Vector3(2 * SIZE_GROUND.SIZE_Y, 20, 0)}
            radiusBottom={400}
            radiusTop={10}
            height={40}
          />
          <Mountain
            position={new Vector3(0, 40, -2 * SIZE_GROUND.SIZE_Y)}
            radiusBottom={400}
            radiusTop={100}
            height={80}
          />
        </React.Fragment>
      ))}
    </group>
  );
});
