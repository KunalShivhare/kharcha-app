import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { faker } from '@faker-js/faker/.';
import ProgressBar from '../animated/progressBar';
import { HStack } from '../customUI/HStack';
import { VStack } from '../customUI/VStack';
import { Text } from '../text';
import Button from '../buttons/button';

const SummaryCard = ({ owed, own, onViewDetails, onBalance, onSettleUp }) => {
  return (
    <VStack style={styles.groupCardContainer}>
      <HStack>
        <VStack style={styles.groupInfoContainer}>
          <HStack style={styles.justifyBetween}>
            <VStack
              style={{
                gap: 8,
              }}
            >
              <Text variant={'label3_regular'} fontColor="#F3f3f3BA" style={styles.texWhite}>
                Total Owed
              </Text>
              <Text variant={'heading4_regular'} fontColor="#1ccca7FF">{`+$${owed}`}</Text>
            </VStack>
            <VStack
              style={{
                alignItems: 'flex-end',
                gap: 8,
              }}
            >
              <Text variant={'label3_regular'} fontColor="#F3f3f3BA" style={styles.texWhite}>
                Total Owe
              </Text>
              <Text variant={'heading4_regular'} fontColor={'#fb9c66'}>{`-$${own}`}</Text>
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
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupCardContainer: {
    backgroundColor: '#2b2c2d',
    marginHorizontal: 16,
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
    paddingVertical: 10,
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
