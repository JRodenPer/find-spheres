import {
  MOUNTAINS_RADIUS_BOTTOM_PERCENT,
  VILLAGE_PER_MOUNTAIN_COUNT,
} from "../constants";

type Range = [number, number];
type Position = [number, number];
//export type RandodomInfo = [number, number, number, number];

export interface RandodomInfo {
  position: [number, number, number];
  radius: number;
  height: number;
  subPositionsVillage: [number, number][];
  subPositionsTree: [number, number][];
}

function isPointInsideCircle(
  center: [number, number],
  radius: number,
  point: [number, number]
): boolean {
  return (
    (point[0] - center[0]) ** 2 + (point[1] - center[1]) ** 2 <= radius ** 2
  );
}

function getRandomNumbersInRange(
  range1: Range,
  range2: Range
): [number, number] {
  const [min1, max1] = range1;
  const [min2, max2] = range2;

  const random1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
  const random2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

  return [random1, random2];
}

export function generateRandomMountainsPos(
  gridWidth: number,
  gridHeight: number,
  numPositions: number,
  percentAvailable: number,
  radiusMin: number,
  radiusMax: number,
  heightMin: number,
  heightMax: number
): RandodomInfo[] {
  const positions: RandodomInfo[] = [];

  for (let i = 0; i < numPositions; i++) {
    const x = Math.floor(Math.random() * gridWidth);
    const y = Math.floor(Math.random() * gridHeight);
    const [radius, height] = getRandomNumbersInRange(
      [radiusMin, radiusMax],
      [heightMin, heightMax]
    );

    positions.push({
      position: [x - gridWidth / 2, height / 2, y - gridHeight / 2],
      radius,
      height,
      subPositionsVillage: [],
      subPositionsTree: [],
    });
  }

  positions.sort((item1, item2) => item2.height - item1.height);

  const tolerance = 40;
  for (let i = 0; i < positions.length; i++) {
    const centerPos = positions[i].position;
    const radius = positions[i].radius;
    const activeDistance = (2 * radius) / Math.sqrt(2) - tolerance;
    const maxSubPositions = activeDistance;
    const countVillage = getRandomNumber(VILLAGE_PER_MOUNTAIN_COUNT, 2);
    for (let j = 0; j < maxSubPositions; j++) {
      const x = getRandomNumber(activeDistance, 0);
      const y = getRandomNumber(activeDistance, 0);

      const subPosition: [number, number] = [
        centerPos[0] - activeDistance / 2 + x,
        centerPos[2] - activeDistance / 2 + y,
      ];

      // check valid position
      let isValid = true;
      for (let k = 0; k < i; k++) {
        const centerPosCheck = positions[k].position;
        const radiusCheck =
          positions[k].radius * MOUNTAINS_RADIUS_BOTTOM_PERCENT;
        const checkPosition = isPointInsideCircle(
          [centerPosCheck[0], centerPosCheck[2]],
          radiusCheck,
          subPosition
        );
        if (checkPosition) {
          isValid = false;
          break;
        }
      }
      if (!isValid) continue;

      if (positions[i].subPositionsVillage.length < countVillage)
        positions[i].subPositionsVillage.push(subPosition);
      else positions[i].subPositionsTree.push(subPosition);
    }
  }

  return positions;
}

/*export function generateRandomPos(
  gridWidth: number,
  gridHeight: number,
  numPositions: number
): Position[] {
  const positions: Position[] = [];

  for (let i = 0; i < numPositions; i++) {
    const x = Math.floor(Math.random() * gridWidth);
    const y = Math.floor(Math.random() * gridHeight);
    positions.push([x - gridWidth / 2, y - gridHeight / 2]);
  }

  return positions;
}*/

export function generateRandomPos(
  gridWidth: number,
  gridHeight: number,
  numPositions: number,
  minDistance: number,
  maxAttempts: number
): Position[] {
  const positions: Position[] = [];

  const minDistanceSquared = minDistance * minDistance;

  for (let i = 0; i < numPositions; i++) {
    let validPosition = false;
    let attempts = 0;
    let x: number = 0,
      y: number = 0;

    const isValidPosition = (): boolean => {
      return positions.every(([px, py]) => {
        const dx = x - px;
        const dy = y - py;
        const distanceSquared = dx * dx + dy * dy;
        return distanceSquared >= minDistanceSquared;
      });
    };

    while (!validPosition && attempts < maxAttempts) {
      x = Math.floor(Math.random() * gridWidth) - gridWidth / 2;
      y = Math.floor(Math.random() * gridHeight) - gridHeight / 2;

      validPosition = isValidPosition();

      attempts++;
    }

    if (!validPosition) {
      break;
    }

    positions.push([x, y]);
  }

  return positions;
}

export function getPositionsInCircle(
  gridWidth: number,
  gridHeight: number,
  center: [number, number],
  radius: number
): [number, number][] {
  const positionsInCircle: [number, number][] = [];
  const centerX = center[0] - gridWidth / 2;
  const centerY = center[1] - gridHeight / 2;

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      if (distance <= radius) {
        positionsInCircle.push([x, y]);
      }
    }
  }

  return positionsInCircle;
}

export function getRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
