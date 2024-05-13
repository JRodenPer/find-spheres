import { create } from "zustand";

export interface IMountainsState {
  positionsMountain: any;
  addPositionsMountain: (positionsMountain: any) => void;
}

export interface ISpheresState {
  spheres: { pos: [number, number, number]; stars: number }[];
  lastPicked: number;
  win: boolean;
  addSphere: (position: [number, number, number], stars: number) => void;
  pickSphere: (stars: number) => void;
}

export interface ILoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface IPlayerState {
  position: [number, number, number];
  direction: [number, number];
  setPosition: (position: [number, number, number]) => void;
  setDirection: (direction: [number, number]) => void;
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
  lastPicked: 0,
  win: false,

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
      lastPicked: stars,
      win: state.spheres.length === 1,
    }));
  },
}));

export const useLoadingStore = create<ILoadingState>((set) => ({
  loading: true,

  setLoading: (loading: boolean) => {
    set(() => ({
      loading,
    }));
  },
}));

export const usePlayerStore = create<IPlayerState>((set) => ({
  position: [0, 0, 0],
  direction: [0, 1],

  setPosition: (position: [number, number, number]) => {
    set(() => ({
      position: [position[0], position[1], position[2]],
    }));
  },
  setDirection: (direction: [number, number]) => {
    set(() => ({
      direction: [direction[0], direction[1]],
    }));
  },
}));
