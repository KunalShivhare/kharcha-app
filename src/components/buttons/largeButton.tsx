import React, { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { COLORS } from '../../providers/theme.style';
import { resize } from '../../utils/deviceDimentions';

const LargeButton: React.FC<{
  title: string | ReactElement;
  style?: ViewStyle;
  onPress?: () => void;
}> = ({ title, style, onPress }) => {
  return (
    <Pressable style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.green100,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: resize(8),
    borderRadius: resize(16),
    height: resize(56),
  },
  title: {
    color: COLORS.light80,
    fontSize: resize(18),
    lineHeight: resize(22),
    fontWeight: '600',
  },
});
