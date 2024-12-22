import { HStack } from '@/src/components/customUI/HStack';
import ImageGroup from '@/src/components/customUI/ImageGroup';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import Entypo from '@expo/vector-icons/Entypo';
import { faker } from '@faker-js/faker/.';
import { useLocalSearchParams } from 'expo-router';
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

const AddExpense = () => {
  const images = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
  const { groupId } = useLocalSearchParams();
  const {
    amount,
    description,
    setAmount,
    setDescription,
    splitType,
    setSplitType,
    amountRef,
    onAddExpense,
  } = useAddExpense({
    groupId: groupId?.toString() ?? '',
  });

  return (
    <View style={styles.container}>
      <Header title={'Add Expense'} />
      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        <>
          <HStack style={styles.groupContainer}>
            <HStack style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: faker.image.avatar() }} style={styles.avatar} />
              <Text style={styles.groupName}>{faker.word.noun() + ' ' + faker.word.noun()}</Text>
            </HStack>
            <Entypo name="chevron-down" size={resize(24)} color={COLORS.primary} />
          </HStack>
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
                ref={amountRef}
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
                  onPress={() => setSplitType(item)}
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
        <TouchableOpacity style={styles.buttonContainer} onPress={onAddExpense}>
          <Text style={styles.title}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
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
