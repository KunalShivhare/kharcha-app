import { useContactStore } from '@/src/stores/contactStore';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Contact } from './types';

const useContacts = () => {
  const [contacts, fetchContacts, loadingContact] = useContactStore(
    useShallow((state) => [state.contacts, state.fetchContacts, state.loadingContact])
  );

  const [selectedContacts, setSelectedContacts] = useState<Array<Contact>>([]);

  const onSelectContact = (contact: Contact) => {
    setSelectedContacts([...selectedContacts, contact]);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, selectedContacts, onSelectContact, loadingContact };
};
export { useContacts };
