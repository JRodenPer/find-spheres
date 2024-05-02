import { create } from "zustand";
import { SIZE_GROUND } from "../constants";

export interface IState {
  positionPlayer: [number, number, number];
  positions: number[][];
  setPositionPlayer: (position: [number, number, number]) => void;
  updatePosition: (position: [number, number, number]) => void;
}

function initializeArray<X extends number, Y extends number>(
  width: X,
  height: Y
): number[][] {
  return Array.from({ length: width }, () =>
    Array.from({ length: height }, () => 0)
  );
}

export const useStore = create<IState>((set) => ({
  positionPlayer: [0, 0, 0],
  positions: initializeArray(SIZE_GROUND.SIZE_X, SIZE_GROUND.SIZE_Y),

  updatePosition: (position: [number, number, number]) => {
    set((state) => {
      const newPositions = [...state.positions];

      const [x, height, y] = position;
      newPositions[x][y] = height + 0.1;

      return {
        ...state,
        positions: newPositions,
      };
    });
  },

  setPositionPlayer: (positionPlayer: [number, number, number]) => {
    //console.log(positionPlayer);
    set(() => ({
      positionPlayer,
    }));
  },
}));
