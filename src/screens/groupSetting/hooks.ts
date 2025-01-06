import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useGroupStore } from '@/src/stores/groupStore';

const useGroupSetting = ({ groupId }: { groupId: string }) => {
  const currentGroup = useGroupStore((state) => state.getGroup(groupId));
  const navigation = useAuthorizeNavigation();

  const onEditGroup = () => {
    navigation.navigate('CreateGroup', {
      groupId: groupId,
    });
  };
  return { currentGroup, onEditGroup };
};

export { useGroupSetting };
