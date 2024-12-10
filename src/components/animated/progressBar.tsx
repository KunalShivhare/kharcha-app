import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

const ProgressBar = ({ owed, own, style }: { owed: number; own: number; style: ViewStyle }) => {
  const total = owed + own;
  const positiveRatio = total > 0 ? (owed / total) * 100 : 0;

  return (
    <View style={[styles.progressBar, style]}>
      <View style={[styles.progress, { width: `${positiveRatio}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#101010',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#1bc29f',
  },
});

export default ProgressBar;
