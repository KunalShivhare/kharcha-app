import { create } from 'zustand';

type GROUP_STORE = {
  groups: Array<any>;
  createGroup: (value: any) => any;
  editGroup: (value: any) => any;
  getGroup: (groupId: string) => any;
};

const useGroupStore = create<GROUP_STORE>((set, get) => ({
  groups: [],
  createGroup: (group: any) => {
    set((state) => ({ groups: [group, ...state.groups] }));
  },
  editGroup: (updatedGroup: any) => {
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === updatedGroup.id ? { ...group, ...updatedGroup } : group
      ),
    }));
  },
  getGroup: (groupId: string) => {
    const state = get();
    return state.groups.find((group) => group.id === groupId);
  },
}));

export { useGroupStore };
