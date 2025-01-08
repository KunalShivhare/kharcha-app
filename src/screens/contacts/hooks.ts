import { useContactStore } from '@/src/stores/contactStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Contact } from './types';
import useBackHandler from '@/src/utilities/useBackHandler';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useGroupStore } from '@/src/stores/groupStore';

const useContacts = ({
  groupId,
  navigateToScreen,
}: {
  groupId?: string;
  navigateToScreen?: any;
}) => {
  const [
    contacts,
    fetchContacts,
    loadingContact,
    selectedContacts,
    selectContact,
    removeContact,
    resetSelectedContacts,
  ] = useContactStore(
    useShallow((state) => [
      state.contacts,
      state.fetchContacts,
      state.loadingContact,
      state.selectedContacts,
      state.selectContact,
      state.removeContact,
      state.resetSelectedContacts,
    ])
  );
  const currentGroup = useGroupStore((state) => state.getGroup(groupId ?? ''));
  const { editGroup } = useGroupStore();
  const groupMembers = currentGroup?.members ?? [];
  const navigation = useAuthorizeNavigation();

  const onSelectContact = (contact: Contact) => {
    const index = selectedContacts.findIndex(
      (selectedContact) => selectedContact?.phoneNumber === contact?.phoneNumber
    );
    if (index === -1) {
      selectContact(contact);
    } else {
      removeContact(contact);
    }
  };

  const isSelected = (contact: Contact) => {
    return selectedContacts.some(
      (selectedContact) => selectedContact?.phoneNumber === contact?.phoneNumber
    );
  };

  const isDisabled = (contact: Contact) => {
    return groupMembers.some(
      (selectedContact: any) => selectedContact?.phoneNumber === contact?.phoneNumber
    );
  };

  const onGoBack = () => {
    navigation.goBack();
    resetSelectedContacts();
  };

  const onNext = () => {
    navigation.navigate(navigateToScreen ?? 'SelectedContactList');
  };

  const onSave = () => {
    const group = {
      ...currentGroup,
      members: [...currentGroup?.members, ...selectedContacts],
    };
    editGroup(group);
    resetSelectedContacts();
    navigation.pop();
  };

  useEffect(() => {
    if (!contacts.length) {
      fetchContacts();
    }
  }, []);

  useBackHandler(onGoBack);

  return {
    contacts,
    selectedContacts,
    onSelectContact,
    loadingContact,
    isSelected,
    resetSelectedContacts,
    onGoBack,
    removeContact,
    onNext,
    onSave,
    isDisabled,
  };
};
export { useContacts };
