import { useEffect } from 'react';
import { create } from 'zustand';
import * as Contacts from 'expo-contacts';
import { Contact } from '../app/(tabs)/contacts/types';

type CONTACT_STORE = {
  contacts: Array<Contact>;
  fetchContacts: () => void;
  loadingContact: boolean;
  selectedContacts: Array<Contact>;
  selecteContact: (selectedContact: Contact) => void;
  removeContact: (selectedContact: Contact) => void;
  resetSelectedContacts: () => void;
};

const useContactStore = create<CONTACT_STORE>((set) => ({
  contacts: [],
  selectedContacts: [],
  fetchContacts: async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      const uniqueContacts = new Map();

      data?.forEach((contact) => {
        if (contact.phoneNumbers) {
          contact?.phoneNumbers?.forEach((phoneNumber) => {
            const formattedNumber = phoneNumber?.number
              ? phoneNumber.number.replace(/\s+/g, '')
              : ''; // Normalize the number
            if (!uniqueContacts.has(formattedNumber)) {
              uniqueContacts.set(formattedNumber, {
                name: contact.name || '',
                phoneNumber: formattedNumber,
                image: contact.imageAvailable ? contact.image : null,
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
              });
            }
          });
        }
      });
      const contactSet = Array.from(uniqueContacts.values());
      set(() => ({ contacts: contactSet }));
      set(() => ({ loadingContact: false }));
    }
  },
  loadingContact: true,
  selecteContact: (selectedContact: Contact) => {
    set((state) => ({ selectedContacts: [...state.selectedContacts, selectedContact] }));
  },
  removeContact: (selectedContact: Contact) => {
    set((state) => ({
      selectedContacts: state.selectedContacts.filter(
        (contact) => contact.phoneNumber !== selectedContact.phoneNumber
      ),
    }));
  },
  resetSelectedContacts: () => {
    set(() => ({ selectedContacts: [] }));
  },
}));

export { useContactStore };
