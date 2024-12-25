import { create } from 'zustand';

type FRIEND_STORE = {
  self: Record<string, any>;
  addSelf: (self: Record<string, any>) => void;
};

const useSelfStore = create<FRIEND_STORE>((set) => ({
  self: {},
  addSelf: (self: Record<string, any>) => {
    set(() => ({ self }));
  },
}));

export { useSelfStore };
