import { COLORS } from '@/src/providers/theme.style';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

const Separator = ({ customStyle }: { customStyle?: ViewStyle }) => (
  <View style={[styles.separator, customStyle]} />
);

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: COLORS.dark25,
    marginVertical: 8,
    borderRadius: 100,
  },
});
