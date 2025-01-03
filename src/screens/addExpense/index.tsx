import { HStack } from '@/src/components/customUI/HStack';
import ImageGroup from '@/src/components/customUI/ImageGroup';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { COLORS } from '@/src/providers/theme.style';
import { useExpenseShareWithPersonsStore } from '@/src/stores/expenseShareWithPersons';
import { useGroupStore } from '@/src/stores/groupStore';
import { resize } from '@/src/utils/deviceDimentions';
import Entypo from '@expo/vector-icons/Entypo';
import { faker } from '@faker-js/faker/.';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SPLIT_TYPE, useAddExpense } from './hooks';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';

const AddExpense = () => {
  const images = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
  // const { groupId } = useLocalSearchParams();
  const groupId = '';

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
  } = useAddExpense({
    groupId: groupId?.toString() ?? '',
  });

  const { groups } = useGroupStore();
  const { expenseSharesWithPersons } = useExpenseShareWithPersonsStore();
  const group = groups.find((group) => group.id === groupId);
  const members = group?.members ?? [];
  const navigation = useAuthorizeNavigation();

  const equalMembers = members;

  const GroupListPopup = {
    show: ({ passProps = {} }: { passProps: any }) => {
      navigation.navigate('CustomModal', {
        cancelOnOutsideClick: true,
        showHeader: false,
        noScrollView: false,
        variant: 'bottom',
        componentKey: 'GroupList',
        ...passProps,
      });
    },
  };

  const PriceDistribution = {
    show: ({ passProps = {} }: { passProps: any }) => {
      navigation.navigate('CustomModal', {
        cancelOnOutsideClick: true,
        showHeader: false,
        noScrollView: false,
        variant: 'bottom',
        componentKey: 'MemberList',
        ...passProps,
      });
    },
  };

  const handleSetUnequally = (item: SPLIT_TYPE) => {
    setSplitType(item);
    if (item === SPLIT_TYPE.UNEQUALLY && !isAddExpenseDisabled)
      PriceDistribution.show({ passProps: { groupId: groupId, amount } });
  };

  const handleAddExpense = async () => {
    if (splitType === SPLIT_TYPE.UNEQUALLY) {
      const isShareEmpty = await expenseSharesWithPersons.every((item) => {
        if (parseFloat(item.amount) === 0) {
          return true;
        }
      });

      if (isShareEmpty) {
        alert('Bhai apne share toh daal lo');
        return;
      }

      onAddUnequalExpense(expenseSharesWithPersons);
    } else if (splitType === SPLIT_TYPE.EQUALLY) {
      onAddExpense(equalMembers);
    }
  };

  const isAddExpenseDisabled = !description || !amount || amount === 0;

  return (
    <ThemeWrapper>
      <View style={styles.container}>
        <Header title={'Add Expense'} />
        <ScrollView
          style={styles.subContainer}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <>
            <Pressable onPress={() => GroupListPopup.show({ passProps: {} })}>
              <HStack style={styles.groupContainer}>
                <HStack style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={{ uri: faker.image.avatar() }} style={styles.avatar} />
                  <Text style={styles.groupName}>
                    {faker.word.noun() + ' ' + faker.word.noun()}
                  </Text>
                </HStack>
                <Entypo name="chevron-down" size={resize(24)} color={COLORS.primary} />
              </HStack>
            </Pressable>
            <View style={styles.splitGroup}>
              <ImageGroup imageHeight={resize(48)} imageWidth={resize(48)} images={images} />
            </View>
            <VStack style={styles.gap8}>
              <VStack style={[styles.descriptionContainer]}>
                <Text style={[styles.textWhite, styles.for]}>For</Text>
                <InputField
                  placeholder="Enter a description"
                  style={styles.descriptionTextInput}
                  value={description ? String(description) : ''}
                  onChangeText={(value) => setDescription(value)}
                />
              </VStack>
              <VStack style={[styles.amountContainer]}>
                <Text style={[styles.amountText]}>Amount</Text>
                <InputField
                  inputRef={amountRef}
                  placeholder="Enter amount"
                  style={[styles.amountTextInput]}
                  value={amount ? String(amount) : ''}
                  onChangeText={(value) => setAmount(Number(value))}
                  keyboardType="decimal-pad"
                  placeholderTextColor={COLORS.dark25}
                />
              </VStack>
            </VStack>
            <VStack style={styles.splitTypeContainer}>
              {Object.values(SPLIT_TYPE).map((item) => {
                return (
                  <Pressable
                    style={[
                      styles.splitTypeItem,
                      { backgroundColor: item === splitType ? '#101010' : undefined },
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
            </VStack>
            <VStack style={[styles.descriptionContainer, styles.paidByHeadingContainer]}>
              <Text style={styles.textWhite}>Paid by</Text>
              <HStack style={styles.paidByContainer}>
                <View style={styles.groupAvatar}>
                  <Image source={{ uri: faker.image.avatar() }} style={styles.avatar} />
                </View>
                <Text style={styles.paidText}>You</Text>
                <View style={styles.downArrow}>
                  <Entypo name="chevron-down" size={resize(28)} color={COLORS.primary} />
                </View>
              </HStack>
            </VStack>
          </>
        </ScrollView>
        <View style={styles.padding16}>
          <TouchableOpacity
            disabled={isAddExpenseDisabled}
            style={styles.buttonContainer}
            onPress={() => handleAddExpense()}
          >
            <Text style={styles.title}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemeWrapper>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
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
    borderRadius: resize(32),
    marginTop: resize(24),
    padding: resize(4),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    height: resize(48),
  },
  amountTextInput: {
    borderWidth: 0,
    paddingVertical: 10,
    fontSize: 24,
    color: '#fefefe',
    textAlign: 'center',
  },
  amountText: {
    color: 'white',
    fontSize: resize(18),
  },
  amountContainer: {
    alignItems: 'center',
  },
  descriptionTextInput: {
    borderWidth: 0,
    paddingVertical: 10,
    color: 'white',
  },
  textWhite: {
    color: 'white',
  },
  descriptionContainer: {
    alignItems: 'center',
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
