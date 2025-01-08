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

  const onAddPeople = () => {
    navigation.navigate('ContactList', {
      groupId: groupId,
    });
  };

  return { currentGroup, onEditGroup, onAddPeople };
};

export { useGroupSetting };
