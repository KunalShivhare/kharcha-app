import React from 'react';
import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { AntDesign } from '@expo/vector-icons';
import { faker } from '@faker-js/faker/.';
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
  const { amount, description, setAmount, setDescription, splitType, setSplitType, amountRef } =
    useAddExpense();

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
            <View style={styles.groupAvatar}>
              <Image source={{ uri: faker.image.avatar() }} style={styles.avatar} />
            </View>
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
              }}
            >
              December Ration
            </Text>
          </HStack>
          <VStack style={styles.descriptionContainer}>
            <Text style={styles.textWhite}>For</Text>
            <InputField
              placeholder="Enter a description"
              style={styles.descriptionTextInput}
              value={description ? String(description) : ''}
              onChangeText={(value) => setDescription(value)}
            />
          </VStack>
          <VStack style={styles.amountContainer}>
            <Text style={styles.amountText}>Amount</Text>
            <InputField
              ref={amountRef}
              placeholder="Enter amount"
              style={styles.amountTextInput}
              value={amount ? String(amount) : ''}
              onChangeText={(value) => setAmount(Number(value))}
              keyboardType="decimal-pad"
            />
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
          <VStack style={styles.descriptionContainer}>
            <Text style={styles.textWhite}>Paid by</Text>
            <HStack style={styles.paidByContainer}>
              <View style={styles.groupAvatar}>
                <Image source={{ uri: faker.image.avatar() }} style={styles.avatar} />
              </View>
              <Text style={styles.paidText}>You</Text>
              <View style={styles.downArrow}>
                <AntDesign name="down" size={resize(16)} color="white" />
              </View>
            </HStack>
          </VStack>
        </>
      </ScrollView>
      <View style={styles.padding16}>
        <TouchableOpacity style={styles.buttonContainer}>
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
  avatar: { height: 40, width: 40, resizeMode: 'contain' },
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
  splitTypeContainer: {
    backgroundColor: COLORS.dark50,
    borderRadius: 20,
    marginTop: resize(24),
    padding: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
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
    paddingTop: 50,
  },
  descriptionTextInput: {
    borderWidth: 0,
    paddingVertical: 10,
  },
  textWhite: {
    color: 'white',
  },
  descriptionContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  groupAvatar: {
    height: resize(40),
    width: resize(40),
    borderRadius: 100,
    overflow: 'hidden',
  },
  groupContainer: {
    paddingTop: 50,
    alignItems: 'center',
    borderColor: '#979797',
    paddingHorizontal: resize(20),
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
  paidByContainer: {
    alignItems: 'center',
    borderColor: '#979797',
    paddingHorizontal: resize(20),
    paddingTop: 20,
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
