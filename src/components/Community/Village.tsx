import { HouseSmall } from "./HouseSmall";
import { HouseMid } from "./HouseMid";
import { HouseBig } from "./HouseBig";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { generateRandomPos } from "../../helper/randomPositionHelper";
import { House, HouseType } from "./House";
import { HOUSE_SPACE } from "../../constants";

interface VillageProps {
  housesCount: number;
  position: [number, number, number];
}

export const Village = ({ housesCount, position }: VillageProps) => {
  const [posHouseSmall, setPosHouseSmall] = useState<[number, number][]>([]);
  const [posHouseMid, setPosHouseMid] = useState<[number, number][]>([]);
  const [posHouseBig, setPosHouseBig] = useState<[number, number][]>([]);

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
          position={[
            position[0] - housesCount + item[0],
            position[1],
            position[2] - housesCount + item[1],
          ]}
        />
      ))}

      {posHouseMid.map((item) => (
        <House
          key={nanoid()}
          type={HouseType.Mid}
          position={[
            position[0] - housesCount + item[0],
            position[1],
            position[2] - housesCount + item[1],
          ]}
        />
      ))}

      {posHouseBig.map((item) => (
        <House
          key={nanoid()}
          type={HouseType.Big}
          position={[
            position[0] - housesCount + item[0],
            position[1],
            position[2] - housesCount + item[1],
          ]}
        />
      ))}
    </>
  );
};
