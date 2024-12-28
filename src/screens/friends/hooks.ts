import { useFriendStore } from '@/src/stores/friendsStore';

const useFriends = () => {
  const friends = useFriendStore((state) => state.friends);

  return { friends };
};

export { useFriends };
