import { useEffect } from 'react';
import { create } from 'zustand';
import * as Contacts from 'expo-contacts';

type CONTACT_STORE = {
  contacts: Array<any>;
  fetchContacts: () => void;
  loadingContact: boolean;
};

const useContactStore = create<CONTACT_STORE>((set) => ({
  contacts: [],
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
}));

export { useContactStore };