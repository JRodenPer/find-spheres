type Range = [number, number];
type Position = [number, number];
export type RandodomInfo = [number, number, number, number];

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
    positions.push([x - gridWidth / 2, y - gridHeight / 2, radius, height]);
  }

  return positions;
}

export function generateRandomPos(
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
