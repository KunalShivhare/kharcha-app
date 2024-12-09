import ProgressBar from '@/src/components/animated/progressBar';
import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { faker } from '@faker-js/faker/.';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useGroups } from './hooks';
import Button from '@/src/components/buttons/button';
import { Text } from '@/src/components/text';

const Groups = () => {
  const { owed, own, onSettleUp, onViewDetails, onBalance } = useGroups();
  return (
    <View>
      <Header title="Group" />
      <VStack style={styles.groupCardContainer}>
        <HStack>
          <VStack>
            <Image source={{ uri: faker.image.avatar() }} style={styles.groupIcon} />
          </VStack>
          <VStack style={styles.groupInfoContainer}>
            <HStack style={styles.justifyBetween}>
              <VStack>
                <Text variant={'label4_regular'} fontColor="#979797" style={styles.texWhite}>
                  Total Owed
                </Text>
                <Text
                  variant={'label1_regular'}
                  fontColor="#1CC29F"
                  style={styles.paddingT10}
                >{`+$${owed}`}</Text>
              </VStack>
              <VStack>
                <Text variant={'label4_regular'} fontColor="#979797" style={styles.texWhite}>
                  Total Owe
                </Text>
                <Text
                  variant={'label1_regular'}
                  fontColor={COLORS.orange}
                  style={[styles.texWhite, styles.paddingT10]}
                >{`-$${own}`}</Text>
              </VStack>
            </HStack>
            <ProgressBar
              owed={owed}
              own={own}
              style={{
                marginTop: resize(8),
              }}
            />
          </VStack>
        </HStack>
        <HStack style={[styles.justifyBetween, styles.paddingT10]}>
          <Button type="Primary" size="short" title="Settle up" onPress={onSettleUp} />
          <Button
            type="Secondary"
            size="short"
            title="View Details"
            onPress={onViewDetails}
            customStyle={styles.backgroundTransparent}
          />
          <Button
            type="Secondary"
            size="short"
            title="Balance"
            onPress={onBalance}
            customStyle={styles.backgroundTransparent}
          />
        </HStack>
      </VStack>
      <VStack
        style={{
          padding: 16,
        }}
      >
        <HStack>
          <VStack>
            <Image
              source={{ uri: faker.image.avatar() }}
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',
                borderRadius: 50,
              }}
            />
          </VStack>
          <VStack
            style={{
              flex: 1,
              paddingHorizontal: 16,
              gap: 4,
            }}
          >
            <Text variant={'heading4_bold'} fontColor="white">
              Costa Coffee
            </Text>
            <Text variant={'label2_medium'} fontColor="#979797">
              You paid $250
            </Text>
          </VStack>
          <VStack
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <Text variant={'label2_medium'} fontColor="#979797">
              Dec, 09
            </Text>
            <Text variant={'heading4_bold'} fontColor="#ACE4D6">
              $125.00
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupCardContainer: {
    backgroundColor: COLORS.dark50,
    margin: 16,
    padding: 10,
    borderRadius: 15,
  },
  groupIcon: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  groupInfoContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  texWhite: {
    color: 'white',
  },
  paddingT10: {
    paddingTop: 10,
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },
});
