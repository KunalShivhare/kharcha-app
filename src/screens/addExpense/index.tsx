import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { COLORS } from '@/src/providers/theme.style';
import { useExpenseShareWithPersonsStore } from '@/src/stores/expenseShareWithPersons';
import { useGroupStore } from '@/src/stores/groupStore';
import { resize } from '@/src/utils/deviceDimentions';
import Entypo from '@expo/vector-icons/Entypo';
import { faker } from '@faker-js/faker/.';
import React, { useMemo } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SPLIT_TYPE, useAddExpense } from './hooks';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { useRoute } from '@react-navigation/native';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { gap, Layout, margin, padding } from '@/src/components/themes/globalStyles';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Text } from '@/src/components/text';
import { useTheme } from '@/src/components/themes/hooks';
import PaidByList from '../lists/paidByList';
import DismissKeyboard from '@/src/HOCs/DismissKeyboard';
import Button from '@/src/components/buttons/button';
import { useKeyboardStatus } from '@/src/hooks/keyboard';

const AddExpense = () => {
  const images = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
  const { params } = useRoute<AuthorizeNavigationProp<'AddExpense'>>();
  const { groupId } = params;
  const theme = useTheme();

  const {
    amount,
    description,
    setAmount,
    setDescription,
    splitType,
    setSplitType,
    amountRef,
    onAddExpense,
    onGroupPress,
    onAddUnequalExpense,
    membersList,
    selectedGroup,
    removeMemberFromExpense,
    paidByUser,
    setPaidByUser,
    inputExpense,
    onEndEditing,
    handleSetUnequally,
  } = useAddExpense({
    groupId: groupId?.toString() ?? '',
  });

  const isKeyboardVisible = useKeyboardStatus();

  const { groups } = useGroupStore();
  const { expenseSharesWithPersons } = useExpenseShareWithPersonsStore();
  const group = groups.find((group) => group.id === groupId);
  const members = group?.members ?? [];
  const navigation = useAuthorizeNavigation();

  const PaidByListPopup = {
    show: ({ passProps = {} }: { passProps: any }) => {
      navigation.navigate('CustomModal', {
        cancelOnOutsideClick: true,
        showHeader: false,
        noScrollView: false,
        variant: 'bottom',
        children: (componentId: string, closeModal?: () => void) => (
          <PaidByList
            selectedUser={paidByUser}
            users={members}
            componentId={componentId}
            closeModal={closeModal}
            onPress={(user: any) => setPaidByUser(user)}
          />
        ),
        ...passProps,
      });
    },
  };

  const isAddExpenseDisabled = !description || !amount || amount === 0;

  return (
    <ThemeWrapper>
      <KeyboardAvoidingView style={Layout.container} behavior="padding">
        <>
          <ScrollView style={Layout.container} keyboardShouldPersistTaps={'handled'}>
            <Header title={'Add Expense'} />
            <View>
              <ScrollView
                horizontal
                style={{
                  padding: 0,
                  backgroundColor: theme.colors.modalBackground,
                  marginHorizontal: 8,
                  borderRadius: 20,
                }}
                contentContainerStyle={{
                  paddingRight: 20,
                }}
              >
                <Pressable
                  style={[
                    Layout.container,
                    padding.l6,
                    padding.v12,
                    gap.g10,
                    Layout.alignCenter,
                    {
                      width: 40,
                    },
                  ]}
                  // onPress={() => }
                >
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      backgroundColor: '#fefefe',
                      borderRadius: 50,
                      width: 30,
                      height: 30,
                    }}
                  >
                    <AntDesign name="plus" color={'black'} size={25} />
                  </View>
                  <Text variant="label3_regular">Add</Text>
                </Pressable>
                {membersList.map((member) => {
                  return (
                    <Pressable
                      style={[
                        Layout.container,
                        padding.v12,
                        gap.g10,
                        Layout.alignCenter,
                        {
                          width: 60,
                          marginTop: 2,
                        },
                      ]}
                      onPress={() => removeMemberFromExpense(member)}
                    >
                      <View
                        style={{
                          position: 'absolute',
                          alignSelf: 'flex-end',
                          zIndex: 2,
                          marginTop: 4,
                          backgroundColor: '#fefefe',
                          borderRadius: 50,
                        }}
                      >
                        <AntDesign name="close" color={'black'} size={20} />
                      </View>
                      <Image
                        source={{ uri: faker.image.avatar() }}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                        }}
                      />
                      <Text variant="label3_regular" numberOfLines={1} textAlign="center">
                        {member?.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              <View style={styles.subContainer}>
                <VStack style={{ paddingTop: resize(32) }}>
                  <HStack style={[styles.descriptionContainer]}>
                    <Pressable
                      style={{
                        backgroundColor: theme.colors.modalBackground,
                        borderWidth: 1,
                        borderColor: theme.colors.Grey99,
                        borderRadius: 4,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AntDesign name="menu-fold" color={'white'} size={20} />
                    </Pressable>

                    <InputField
                      placeholder="Description"
                      style={styles.descriptionTextInput}
                      containerStyle={{
                        flex: 1,
                        paddingRight: 64,
                        justifyContent: 'flex-end',
                      }}
                      value={description ? String(description) : ''}
                      onChangeText={(value) => setDescription(value)}
                    />
                  </HStack>
                  <HStack
                    style={[
                      styles.descriptionContainer,
                      {
                        paddingTop: 10,
                      },
                    ]}
                  >
                    <Pressable
                      style={{
                        backgroundColor: theme.colors.modalBackground,
                        borderWidth: 1,
                        borderColor: theme.colors.Grey99,
                        borderRadius: 4,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FontAwesome name="rupee" color={'white'} size={20} />
                    </Pressable>
                    <InputField
                      placeholder="0.00"
                      style={styles.descriptionTextInput}
                      containerStyle={{
                        flex: 1,
                        paddingRight: 64,
                      }}
                      value={amount ? String(amount) : ''}
                      keyboardType="numeric"
                      onChangeText={(value) => setAmount(Number(value))}
                      onEndEditing={onEndEditing}
                    />
                  </HStack>
                </VStack>
                <Pressable onPress={() => PaidByListPopup.show({ passProps: {} })}>
                  <HStack style={[Layout.justifyCenter, Layout.alignCenter, padding.t24]}>
                    <Text variant="label3_regular" style={padding.r10}>
                      Paid by
                    </Text>
                    <HStack
                      style={{
                        backgroundColor: theme.colors.modalBackground,
                        borderWidth: 1,
                        borderColor: theme.colors.Grey99,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 4,
                        paddingLeft: 4,
                        paddingVertical: 4,
                      }}
                    >
                      <Text variant="label3_regular">{paidByUser?.name ?? 'You'}</Text>
                      <Entypo name="chevron-down" size={resize(20)} color={COLORS.primary} />
                    </HStack>
                  </HStack>
                </Pressable>
              </View>
            </View>

            <HStack style={styles.splitTypeContainer}>
              {Object.values(SPLIT_TYPE).map((item) => {
                return (
                  <Pressable
                    style={[
                      styles.splitTypeItem,
                      item === splitType
                        ? {
                            borderBottomColor: COLORS.primary,
                            borderBottomWidth: 1,
                          }
                        : undefined,
                    ]}
                    onPress={() => handleSetUnequally(item)}
                    key={item}
                  >
                    <Text
                      style={[
                        styles.splitTypeText,
                        { color: item === splitType ? '#1cc29f' : '#fefefe' },
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </HStack>
            <ScrollView
              contentContainerStyle={[
                padding.v16,
                gap.g16,
                {
                  backgroundColor: COLORS.dark50,
                  borderRadius: resize(4),
                  padding: resize(4),
                  marginHorizontal: resize(16),
                  justifyContent: 'space-between',
                },
              ]}
            >
              {membersList.map((member, index) => {
                return (
                  <HStack
                    key={String(member?.phoneNumber) + index}
                    style={[
                      Layout.container,
                      padding.l16,
                      padding.r16,
                      gap.g10,
                      Layout.alignCenter,
                      Layout.spaceBetween,
                    ]}
                  >
                    <HStack style={[Layout.alignCenter, gap.g10]}>
                      <Image
                        source={{ uri: faker.image.avatar() }}
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                        }}
                      />
                      <Text variant="label3_regular" fontColor="white">
                        {member?.name}
                      </Text>
                    </HStack>
                    <HStack style={[Layout.justifyCenter, Layout.alignCenter]}>
                      <Text variant="label3_regular" fontColor="white">
                        ₹
                      </Text>
                      <InputField
                        placeholder="0.00"
                        style={{
                          color: 'white',
                          fontSize: 14,
                          borderBottomWidth: 1,
                          borderBottomColor: 'white',
                          minWidth: 40,
                        }}
                        editable={splitType === SPLIT_TYPE.UNEQUALLY}
                        //@ts-ignore
                        containerStyle={[padding.r16, padding.l4]}
                        keyboardType="numeric"
                        value={member?.amount ? String(member?.amount) : ''}
                        onChangeText={(value) => {
                          if (amount) {
                            inputExpense(member, value);
                          } else {
                            alert('Please enter the amount first');
                          }
                        }}
                      />
                    </HStack>
                  </HStack>
                );
              })}
            </ScrollView>
          </ScrollView>
          {!isKeyboardVisible && (
            <View style={styles.padding16}>
              <Button
                type="Primary"
                size="long"
                title="Done"
                onPress={onAddExpense}
                customStyle={styles.buttonContainer}
                disabled={isAddExpenseDisabled}
              />
            </View>
          )}
        </>
      </KeyboardAvoidingView>
    </ThemeWrapper>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  subContainer: {
    paddingHorizontal: resize(16),
  },
  avatar: { height: 40, width: 40, borderRadius: 50, resizeMode: 'contain' },
  groupName: {
    color: 'white',
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: COLORS.green100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: resize(8),
    borderRadius: resize(10),
    borderWidth: 0,
  },
  gap8: { gap: resize(8) },
  for: {
    fontSize: resize(20),
  },
  title: {
    color: COLORS.light80,
    fontSize: resize(18),
    lineHeight: resize(22),
    fontWeight: '600',
  },
  splitTypeContainer: {
    backgroundColor: COLORS.dark50,
    borderRadius: resize(4),
    marginTop: resize(24),
    paddingHorizontal: resize(4),
    paddingTop: resize(4),
    marginHorizontal: resize(16),
    justifyContent: 'space-between',
  },
  amountTextInput: {
    paddingVertical: 10,
    fontSize: 24,
    color: '#fefefe',
    textAlign: 'center',
    paddingHorizontal: resize(16),
  },
  amountText: {
    color: 'white',
    fontSize: resize(18),
    paddingRight: resize(10),
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextInput: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 10,
    color: 'white',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  textWhite: {
    color: 'white',
  },
  descriptionContainer: {
    // flex: 1,
    alignItems: 'flex-end',
    gap: 10,
    paddingLeft: 64,
  },
  splitGroup: {
    marginVertical: resize(20),
  },
  groupAvatar: {
    height: resize(40),
    width: resize(40),
    borderRadius: 100,
    overflow: 'hidden',
  },
  groupContainer: {
    alignItems: 'center',
    borderColor: '#979797',
    paddingHorizontal: resize(6),
    paddingVertical: resize(4),
    backgroundColor: COLORS.dark10,
    borderRadius: resize(40),
  },
  padding16: {
    padding: 16,
  },
  downArrow: {
    alignItems: 'center',
    paddingLeft: 10,
  },
  paidText: {
    color: 'white',
    marginLeft: 10,
    lineHeight: 20,
    fontSize: 16,
  },
  paidByHeadingContainer: {
    marginVertical: resize(32),
    gap: resize(8),
  },
  paidByContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#979797',
    paddingHorizontal: resize(6),
    backgroundColor: COLORS.dark10,
    borderRadius: resize(24),
    paddingTop: resize(4),
    paddingVertical: resize(2),
    gap: resize(4),
  },
  splitTypeItem: {
    flex: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  splitTypeText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
