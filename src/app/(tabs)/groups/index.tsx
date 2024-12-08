import ProgressBar from '@/src/components/animated/progressBar';
import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { faker } from '@faker-js/faker/.';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useGroups } from './hooks';

const Groups = () => {
  const { owed, own } = useGroups();
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
                <Text style={styles.texWhite}>Total Owed</Text>
                <Text style={[styles.texWhite, styles.paddingT10]}>{`+$${owed}`}</Text>
              </VStack>
              <VStack>
                <Text style={styles.texWhite}>Total Owe</Text>
                <Text style={[styles.texWhite, styles.paddingT10]}>{`-$${own}`}</Text>
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
});
