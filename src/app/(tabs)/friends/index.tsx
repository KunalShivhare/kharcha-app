import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import { resize } from '../../../utils/deviceDimentions';
import { faker } from '@faker-js/faker/.';
import { StatusBar } from 'expo-status-bar';
import FloatingButton from '@/src/components/buttons/floatingButton';
import { router } from 'expo-router';

const Friends = () => {
  const renderItem = ({ item, index }: { item: any; index: any }) => {
    const type = faker.helpers.arrayElement(['owe', 'owed']);
    return (
      <View style={styles.friendCardContainer}>
        <View style={styles.friendNameContainer}>
          <View style={styles.friendCardImageContainer}>
            <Image source={{ uri: faker.image.avatar() }} style={styles.friendAvatar} />
          </View>
          <Text style={styles.friendNameText}>{faker.person.fullName()}</Text>
        </View>
        <View style={styles.expenseTypeContainer}>
          <Text
            style={[
              styles.expenseAmount,
              {
                color: type === 'owed' ? '#1CC29F' : '#EC5601',
              },
            ]}
          >
            {type === 'owed' ? '+' : '-'} ₹
            {faker.number
              .float({
                min: 5,
                max: 2345,
              })
              .toFixed(2)
              .toString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: resize(16),
          paddingVertical: resize(8),
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: resize(18),
          }}
        >
          Friends
        </Text>
      </View>

      <FlatList
        data={Array.from({ length: 20 })}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
      />
      <FloatingButton
        text="+ Add Friend"
        textStyle={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
        }}
        onPress={() => {
          router.push('/contacts/contactList');
        }}
      />
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendCardContainer: {
    paddingHorizontal: resize(16),
    paddingVertical: resize(8),
    margin: resize(8),
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#373B3E',
  },
  friendCardImageContainer: {
    height: resize(40),
    width: resize(40),
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendAvatar: {
    height: 40,
    width: 40,
    resizeMode: 'center',
  },
  friendNameContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
    padding: 10,
  },
  friendNameText: {
    fontSize: 14,
    color: '#fff',
  },
  expenseTypeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  expenseType: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
});
