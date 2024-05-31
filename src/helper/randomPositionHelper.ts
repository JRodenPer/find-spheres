import { Vector2, Vector3 } from "three";
import { VILLAGE_PER_MOUNTAIN_COUNT } from "../constants";

export interface RandodomInfo {
  position: Vector3;
  radius: number;
  height: number;
  subPositionsVillage: Vector2[];
  subPositionsItem: { position: Vector2; isDragonBall: boolean }[];
}

function isPointInsideCircle(
  center: Vector2,
  radius: number,
  point: Vector2
): boolean {
  return (point.x - center.x) ** 2 + (point.y - center.y) ** 2 <= radius ** 2;
}

function getRandomNumbersInRange(range1: Vector2, range2: Vector2): Vector2 {
  const random1 =
    Math.floor(Math.random() * (range1.y - range1.x + 1)) + range1.x;
  const random2 =
    Math.floor(Math.random() * (range2.y - range2.x + 1)) + range2.x;

  return new Vector2(random1, random2);
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
  let totalSubitems = 0;

  for (let i = 0; i < numPositions; i++) {
    const x = Math.floor(Math.random() * gridWidth);
    const y = Math.floor(Math.random() * gridHeight);
    const randomItem = getRandomNumbersInRange(
      new Vector2(i === 0 ? radiusMin * 3 : radiusMin, radiusMax),
      new Vector2(heightMin, heightMax)
    );
    const radius = randomItem.x;
    const height = randomItem.y;

    positions.push({
      position: new Vector3(x - gridWidth / 2, height / 2, y - gridHeight / 2),
      radius,
      height,
      subPositionsVillage: [],
      subPositionsItem: [],
    });
  }

  positions.sort((item1, item2) => item2.height - item1.height);

  const tolerance = 40;
  for (let i = 0; i < positions.length; i++) {
    const centerPos = positions[i].position;
    const radius = positions[i].radius;
    const activeDistance = (2 * radius) / Math.sqrt(2) - tolerance;
    const maxSubPositions = percentAvailable * activeDistance;
    const countVillage = getRandomNumber(VILLAGE_PER_MOUNTAIN_COUNT, 2);
    for (let j = 0; j < maxSubPositions; j++) {
      const x = getRandomNumber(activeDistance, 0);
      const y = getRandomNumber(activeDistance, 0);

      const subPosition = new Vector2(
        centerPos.x - activeDistance / 2 + x,
        centerPos.z - activeDistance / 2 + y
      );

      // check valid position
      let isValid = true;
      for (let k = 0; k < i; k++) {
        const centerPosCheck = positions[k].position;
        const radiusCheck = positions[k].radius;
        const checkPosition = isPointInsideCircle(
          new Vector2(centerPosCheck.x, centerPosCheck.z),
          radiusCheck,
          subPosition
        );
        const checkPositionCurrent = isPointInsideCircle(
          new Vector2(positions[i].position.x, positions[i].position.z),
          positions[i].radius,
          subPosition
        );
        if (checkPosition || !checkPositionCurrent) {
          isValid = false;
          break;
        }
      }
      if (!isValid) continue;

      if (positions[i].subPositionsVillage.length < countVillage)
        positions[i].subPositionsVillage.push(subPosition);
      else {
        positions[i].subPositionsItem.push({
          position: subPosition,
          isDragonBall: false,
        });
        totalSubitems++;
      }
    }
  }

  // dragon balls
  const dragonBallPositions = [];
  for (let i = 0; i < 7; i++) {
    const numero = Math.floor(Math.random() * (totalSubitems + 1));
    dragonBallPositions.push(numero);
  }

  let count = 0;
  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions[i].subPositionsItem.length; j++) {
      if (dragonBallPositions.includes(count))
        positions[i].subPositionsItem[j].isDragonBall = true;
      count++;
    }
  }

  console.log("Random positions finished");
  return positions;
}

export function generateRandomPos(
  gridWidth: number,
  gridHeight: number,
  numPositions: number,
  minDistance: number,
  maxAttempts: number
): Vector2[] {
  const positions: Vector2[] = [];

  const minDistanceSquared = minDistance * minDistance;

  for (let i = 0; i < numPositions; i++) {
    let validPosition = false;
    let attempts = 0;
    let x: number = 0,
      y: number = 0;

    const isValidPosition = (): boolean => {
      return positions.every((position) => {
        const dx = x - position.x;
        const dy = y - position.y;
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

    positions.push(new Vector2(x, y));
  }

  return positions;
}

export function getPositionsInCircle(
  gridWidth: number,
  gridHeight: number,
  center: Vector2,
  radius: number
): Vector2[] {
  const positionsInCircle: Vector2[] = [];
  const centerX = center.x - gridWidth / 2;
  const centerY = center.y - gridHeight / 2;

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      if (distance <= radius) {
        positionsInCircle.push(new Vector2(x, y));
      }
    }
  }

  return positionsInCircle;
}

export function getRandomNumber(
  max: number,
  min: number,
  integer: boolean = true
) {
  return integer
    ? Math.floor(Math.random() * (max - min + 1)) + min
    : Math.random() * (max - min) + min;
}
