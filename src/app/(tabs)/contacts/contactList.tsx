import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import Header from '@/src/components/header/header';
import { VStack } from '@/src/components/customUI/VStack';
import { Text } from '@/src/components/text';
import { gap, Layout, padding } from '@/src/components/themes/globalStyles';
import { HStack } from '@/src/components/customUI/HStack';
import { useContacts } from './hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { router } from 'expo-router';
import EmptyScreen from '@/src/components/empty/emptyScreen';

const ContactList = () => {
  const { contacts, selectedContacts, onSelectContact, loadingContact, isSelected, onGoBack } =
    useContacts();

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
            {isSelected(contact) && <MaterialIcons name="check" size={30} color={'green'} />}
          </HStack>
        </Pressable>
      );
    },
    [selectedContacts]
  );

  const memoizedContactCard = useMemo(() => contactCard, [contactCard]);

  return (
    <View style={[Layout.container]}>
      <Header title="Contacts" onPressback={onGoBack} />
      {!loadingContact && contacts.length > 0 && (
        <>
          <VStack style={[padding.h16, padding.v12, Layout.container]}>
            <Text>From your contacts</Text>
            <FlatList
              data={contacts}
              contentContainerStyle={{ paddingTop: 16 }}
              keyExtractor={(item, index) => item?.phoneNumber ?? index.toString()}
              renderItem={memoizedContactCard}
              initialNumToRender={10}
              maxToRenderPerBatch={50}
              windowSize={9}
            />
          </VStack>
          {selectedContacts.length > 0 && (
            <View style={[padding.v16, padding.h16]}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => router.push('/contacts/selectedContactList')}
              >
                <Text style={styles.title}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {loadingContact && (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
        >
          <ActivityIndicator size="large" color="white" />
          <Text variant="label2_semibold">Loading contacts...</Text>
        </ScrollView>
      )}
      {contacts.length === 0 && !loadingContact && (
        <View style={[Layout.container, Layout.justifyCenter, Layout.alignCenter]}>
          <EmptyScreen />
        </View>
      )}
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
