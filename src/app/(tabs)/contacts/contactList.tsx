import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Header from '@/src/components/header/header';
import { VStack } from '@/src/components/customUI/VStack';
import { Text } from '@/src/components/text';
import { gap, Layout, padding } from '@/src/components/themes/globalStyles';
import { HStack } from '@/src/components/customUI/HStack';
import * as Contacts from 'expo-contacts';
import { faker } from '@faker-js/faker/.';
import { useContactStore } from '@/src/stores/contactStore';
import { useContacts } from './hooks';
import { MaterialIcons } from '@expo/vector-icons';

const ContactList = () => {
  const { contacts, selectedContacts, onSelectContact } = useContacts();

  const contactCard = useCallback(
    ({ item: contact, index }: { item: any; index: number }) => {
      return (
        <Pressable onPress={() => onSelectContact(contact)} key={contact?.id}>
          <HStack pb={16}>
            <VStack style={styles.contactAvatarContainer}>
              {contact?.image ? (
                <Image source={{ uri: contact?.image }} style={styles.contactAvatar} />
              ) : (
                <>
                  <MaterialIcons name="call" size={30} color={'white'} />
                </>
              )}
            </VStack>
            <VStack style={[Layout.container, padding.h16, gap.g4]}>
              <Text variant={'heading4_bold'} fontColor="white">
                {contact?.name ?? 'Unknown'}
              </Text>
              <Text variant={'label2_medium'} fontColor="#979797">
                {contact?.phoneNumber}
              </Text>
            </VStack>
          </HStack>
        </Pressable>
      );
    },
    [selectedContacts]
  );

  const memoizedContactCard = useMemo(() => contactCard, [contactCard]);

  return (
    <View>
      <Header title="Contacts" />
      <VStack style={[padding.h16, padding.v12]}>
        <Text>From your contacts</Text>
        <FlatList
          data={contacts}
          contentContainerStyle={{ paddingTop: 16 }}
          keyExtractor={(item) => item.phoneNumber}
          renderItem={memoizedContactCard}
          initialNumToRender={10}
          maxToRenderPerBatch={50}
          windowSize={9}
        />
      </VStack>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  contactAvatarContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatar: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 50,
  },
});
