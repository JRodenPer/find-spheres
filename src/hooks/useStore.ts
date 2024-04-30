import { create } from "zustand";

export interface IState {
  position: [number, number, number];
  setPosition: (position: [number, number, number]) => void;
}

export const useStore = create<IState>((set) => ({
  position: [0, 0, 0],

  setPosition: (position: [number, number, number]) => {
    console.log(position);
    set(() => ({
      position,
    }));
  },
}));
