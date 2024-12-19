import { create } from 'zustand';

type GROUP_STORE = {
  groups: Array<any>;
  createGroup: (value: any) => any;
};

const useGroupStore = create<GROUP_STORE>((set, get) => ({
  groups: [],
  createGroup: (group: any) => {
    set((state) => ({ groups: [group, ...state.groups] }));
  },
}));

export { useGroupStore };
