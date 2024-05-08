import { create } from "zustand";

export interface IMountainsState {
  positionsMountain: any;
  addPositionsMountain: (positionsMountain: any) => void;
}

export interface ISpheresState {
  spheres: { pos: [number, number, number]; stars: number }[];

  addSphere: (position: [number, number, number], stars: number) => void;
  pickSphere: (stars: number) => void;
}

export const useMountainsStore = create<IMountainsState>((set) => ({
  positionsMountain: [],

  addPositionsMountain: (positionsMountain: any) => {
    set(
      () => ({
        positionsMountain: [...positionsMountain],
      }),
      false
    );
  },
}));

export const useSpheresStore = create<ISpheresState>((set) => ({
  spheres: [],

  addSphere: (position: [number, number, number], stars: number) => {
    set((state) => ({
      spheres: [
        ...state.spheres,
        {
          stars,
          pos: [position[0], position[1], position[2]],
        },
      ],
    }));
  },

  pickSphere: (stars: number) => {
    set((state) => ({
      spheres: state.spheres.filter((sphere) => stars !== sphere.stars),
    }));
  },
}));
