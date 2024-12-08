import { COLORS } from '@/src/providers/theme.style';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

type FloatingButtonProps = {
  onPress: () => void;
  style?: object;
  position?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  size?: number;
  backgroundColor?: string;
  text?: string;
  textStyle?: object;
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  style,
  position = { bottom: 20, right: 20 },
  size = 60,
  backgroundColor = COLORS.primary,
  text = '+',
  textStyle = {},
}) => {
  const positionStyle = {
    position: {
      bottom: position?.bottom || 20,
      right: position?.right || 20,
    },
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { width: size, height: size, backgroundColor, ...positionStyle.position },
        style,
      ]}
      activeOpacity={1}
    >
      <View style={styles.innerButton}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default FloatingButton;
