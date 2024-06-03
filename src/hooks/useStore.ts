import { Vector2, Vector3 } from "three";
import { create } from "zustand";

export interface IMountainsState {
  positionsMountain: any;
  addPositionsMountain: (positionsMountain: any) => void;
}

export interface ISpheresState {
  spheres: { pos: Vector3; stars: number }[];
  lastPicked: number;
  win: boolean;
  addSphere: (position: Vector3, stars: number) => void;
  pickSphere: (stars: number) => void;
}

export interface ILoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface IPlayerState {
  position: Vector3;
  direction: Vector2;
  setPosition: (position: Vector3) => void;
  setDirection: (direction: Vector2) => void;
}

export interface ITimerState {
  timer: number;
  setTimer: (time: number) => void;
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

  addSphere: (position: Vector3, stars: number) => {
    set((state) => ({
      spheres: [
        ...state.spheres,
        {
          stars,
          pos: new Vector3(position.x, position.y, position.z),
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
  position: new Vector3(0, 0, 0),
  direction: new Vector2(0, 1),

  setPosition: (position: Vector3) => {
    set(() => ({
      position: new Vector3(position.x, position.y, position.z),
    }));
  },
  setDirection: (direction: Vector2) => {
    set(() => ({
      direction: new Vector2(direction.x, direction.y),
    }));
  },
}));

export const useTimerStore = create<ITimerState>((set) => ({
  timer: 0,

  setTimer: (timer: number) => {
    set(() => ({
      timer,
    }));
  },
}));
