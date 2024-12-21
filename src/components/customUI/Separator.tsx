import { COLORS } from '@/src/providers/theme.style';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Separator = () => <View style={styles.separator} />;

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: COLORS.dark25,
    marginVertical: 8,
    borderRadius: 100,
  },
});
