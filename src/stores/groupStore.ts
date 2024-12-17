import { create } from 'zustand';

type GROUP_STORE = {
  groups: Array<any>;
  createGroup: (value: any) => any;
  groupLength: number;
};

const useGroupStore = create<GROUP_STORE>((set, get) => ({
  groups: [],
  createGroup: (group: any) => {
    set((state) => ({ groups: [group, ...state.groups] }));
  },
  groupLength: get()?.groups?.length ?? [], // Access the current groups state and return its length
}));

export { useGroupStore };
