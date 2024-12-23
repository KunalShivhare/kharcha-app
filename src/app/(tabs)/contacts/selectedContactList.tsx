import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { Text } from '@/src/components/text';
import { gap, Layout, padding } from '@/src/components/themes/globalStyles';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useContacts } from './hooks';

const SelectedContactList = () => {
  const { selectedContacts, onSelectContact, removeContact } = useContacts();

  const contactCard = useCallback(
    ({ item: contact, index }: { item: any; index: number }) => {
      return (
        <Pressable onPress={() => onSelectContact(contact)} key={contact?.id}>
          <HStack pb={16} alignItems="center">
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
            <Pressable onPress={() => removeContact(contact)}>
              <MaterialIcons name="delete-outline" size={30} color={COLORS.red80} />
            </Pressable>
          </HStack>
        </Pressable>
      );
    },
    [selectedContacts]
  );

  const memoizedContactCard = useMemo(() => contactCard, [contactCard]);

  return (
    <View style={[Layout.container]}>
      <Header title="Contacts" />
      <>
        <VStack style={[padding.h16, padding.v12, Layout.container]}>
          <FlatList
            data={selectedContacts}
            contentContainerStyle={{ paddingTop: 16 }}
            keyExtractor={(item, index) => item?.phoneNumber ?? index.toString()}
            renderItem={memoizedContactCard}
            initialNumToRender={10}
            maxToRenderPerBatch={50}
            windowSize={9}
          />
        </VStack>
        <View style={[padding.v16, padding.h16]}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.title}>Done</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

export default SelectedContactList;

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
  buttonContainer: {
    backgroundColor: COLORS.green100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: resize(8),
    borderRadius: resize(10),
  },
  title: {
    color: COLORS.light80,
    fontSize: resize(18),
    lineHeight: resize(22),
    fontWeight: '600',
  },
});
