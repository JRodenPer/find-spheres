import { useEffect, useState } from "react";
import {
  RandodomInfo,
  generateRandomPositions,
} from "../helper/randomPositionHelper";
import {
  MOUNTAINS_COUNT,
  MOUNTAINS_HEIGHT_MAX,
  MOUNTAINS_HEIGHT_MIN,
  MOUNTAINS_RADIUS_MAX,
  MOUNTAINS_RADIUS_MIN,
  SIZE_GROUND,
} from "../constants";
import { Mountain } from "./Mountain";

export const Mountains = () => {
  const [positions, setPositions] = useState<RandodomInfo[]>([]);
  useEffect(() => {
    const items: RandodomInfo[] = generateRandomPositions(
      SIZE_GROUND.SIZE_X,
      SIZE_GROUND.SIZE_Y,
      MOUNTAINS_COUNT,
      MOUNTAINS_RADIUS_MIN,
      MOUNTAINS_RADIUS_MAX,
      MOUNTAINS_HEIGHT_MIN,
      MOUNTAINS_HEIGHT_MAX
    );
    setPositions(items);
  }, []);

  return (
    <group>
      {positions.map((item, index) => (
        <Mountain
          key={index}
          position={[item[0], item[3] / 2, item[1]]}
          radiusTop={item[2]}
          radiusBottom={item[2] * 1.1}
          height={item[3]}
        />
      ))}
    </group>
  );
};
