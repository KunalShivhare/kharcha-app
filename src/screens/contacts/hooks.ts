import { useContactStore } from '@/src/stores/contactStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Contact } from './types';
import useBackHandler from '@/src/utilities/useBackHandler';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';

const useContacts = ({ navigateToScreen }: { navigateToScreen?: any }) => {
  const [
    contacts,
    fetchContacts,
    loadingContact,
    selectedContacts,
    selecteContact,
    removeContact,
    resetSelectedContacts,
  ] = useContactStore(
    useShallow((state) => [
      state.contacts,
      state.fetchContacts,
      state.loadingContact,
      state.selectedContacts,
      state.selecteContact,
      state.removeContact,
      state.resetSelectedContacts,
    ])
  );
  const navigation = useAuthorizeNavigation();

  const onSelectContact = (contact: Contact) => {
    const index = selectedContacts.findIndex(
      (selectedContact) => selectedContact?.phoneNumber === contact?.phoneNumber
    );
    if (index === -1) {
      selecteContact(contact);
    } else {
      removeContact(contact);
    }
  };

  const isSelected = (contact: Contact) => {
    return selectedContacts.some(
      (selectedContact) => selectedContact?.phoneNumber === contact?.phoneNumber
    );
  };

  const onGoBack = () => {
    navigation.goBack();
    resetSelectedContacts();
  };

  const onNext = () => {
    navigation.navigate(navigateToScreen ?? 'SelectedContactList');
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
  };
};
export { useContacts };
