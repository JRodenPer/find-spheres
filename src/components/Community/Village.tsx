import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { generateRandomPos } from "../../helper/randomPositionHelper";
import { House, HouseType } from "./House";
import { HOUSE_SPACE } from "../../constants";
import { Vector2, Vector3 } from "three";

interface VillageProps {
  housesCount: number;
  position: Vector3;
}

export const Village = ({ housesCount, position }: VillageProps) => {
  const [posHouseSmall, setPosHouseSmall] = useState<Vector2[]>([]);
  const [posHouseMid, setPosHouseMid] = useState<Vector2[]>([]);
  const [posHouseBig, setPosHouseBig] = useState<Vector2[]>([]);

  useEffect(() => {
    const positionsSmall = generateRandomPos(
      housesCount,
      housesCount,
      housesCount * 0.6,
      HOUSE_SPACE,
      5
    );
    setPosHouseSmall(positionsSmall);

    const positionsMid = generateRandomPos(
      housesCount,
      housesCount,
      housesCount * 0.3,
      HOUSE_SPACE,
      5
    );
    setPosHouseMid(positionsMid);

    const positionsBig = generateRandomPos(
      housesCount,
      housesCount,
      housesCount * 0.1,
      HOUSE_SPACE,
      5
    );
    setPosHouseBig(positionsBig);
  }, [housesCount]);
  return (
    <>
      {posHouseSmall.map((item) => (
        <House
          key={nanoid()}
          type={HouseType.Small}
          position={
            new Vector3(
              position.x - housesCount + item.x,
              position.y,
              position.z - housesCount + item.y
            )
          }
        />
      ))}

      {posHouseMid.map((item) => (
        <House
          key={nanoid()}
          type={HouseType.Mid}
          position={
            new Vector3(
              position.x - housesCount + item.x,
              position.y,
              position.z - housesCount + item.y
            )
          }
        />
      ))}

      {posHouseBig.map((item) => (
        <House
          key={nanoid()}
          type={HouseType.Big}
          position={
            new Vector3(
              position.x - housesCount + item.x,
              position.y,
              position.z - housesCount + item.y
            )
          }
        />
      ))}
    </>
  );
};
