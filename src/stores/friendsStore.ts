import { create } from 'zustand';

type FRIEND_STORE = {
  friends: Array<any>;
  addFriend: (friend: any) => any;
};

const useFriendStore = create<FRIEND_STORE>((set, get) => ({
  friends: [],
  addFriend: (friend: any) => {
    set((state) => ({ friends: [friend, ...state.friends] }));
  },
}));

export { useFriendStore };
