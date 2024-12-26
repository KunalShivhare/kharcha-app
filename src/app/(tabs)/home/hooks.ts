import { useContactStore } from '@/src/stores/contactStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

const useHome = () => {
  const [contacts, fetchContacts] = useContactStore(
    useShallow((state) => [state.contacts, state.fetchContacts])
  );
  useEffect(() => {
    if (!contacts.length) {
      fetchContacts();
    }
  }, []);
  return {};
};

export { useHome };
