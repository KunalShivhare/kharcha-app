import { COLORS } from '@/src/providers/theme.style';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HStack } from './HStack';

export interface AvatarWithLabelProps {
  uri: string;
  label: string;
  subLabel: string;
}

const AvatarWithLabel = ({ uri, label, subLabel }: AvatarWithLabelProps) => {
  return (
    <HStack style={styles.container}>
      <Image style={styles.image} source={{ uri: uri }} />
      <View style={styles.labelsContainer}>
        <Text style={[styles.font, styles.label]}>{label}</Text>
        <Text style={[styles.font, styles.subLabel]}>{subLabel}</Text>
      </View>
    </HStack>
  );
};

export default AvatarWithLabel;

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  labelsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  font: {
    color: 'white',
  },
  label: {
    fontSize: 18,
  },
  subLabel: {
    fontSize: 14,
    color: COLORS.dark25,
    fontWeight: '700',
  },
});
