import React, { ReactChild } from 'react';
import { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import { useTheme } from '../themes/hooks';
import { Text, TextToken } from '../text';
import { TouchableOpacity } from '../touchables';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';

interface ButtonProps extends TouchableOpacityProps {
  type: 'Primary' | 'Secondary' | 'Dark';
  size: 'long' | 'short' | 'medium';
  title: string;
  width?: string;
  customStyle?: ViewStyle;
  customRightElement?: ReactChild;
  accessibilityLabel?: string;
  isLoading?: boolean;
  color?: string;
  onPress?: () => void;
  isDark?: boolean;
  textVariant?: TextToken;
}

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  disabled,
  onPress,
  title,
  width,
  customStyle,
  customRightElement,
  accessibilityLabel,
  isLoading,
  color,
  textVariant,
}) => {
  const theme = useTheme();

  const borderColor = useMemo<string>(() => COLORS.orange, [theme, type, disabled]);

  const buttonStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: type === 'Primary' ? COLORS.orange : COLORS.dark75,
      width,
      ...customStyle,
      borderColor,
      borderWidth: 1,
    }),
    [theme, type, disabled, width, customStyle]
  );
  console.log('🚀 ~ buttonStyle:', buttonStyle);
  const textColor = useMemo<string>(
    () => (type === 'Primary' ? COLORS.light100 : COLORS.orange),
    [theme, type, disabled]
  );

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.75}
      disabled={disabled || isLoading}
      style={[styles.base, styles[size], buttonStyle]}
      onPress={() => onPress && onPress()}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} color={color ?? textColor} />
      ) : (
        <Text
          variant={textVariant ?? 'label2_semibold'}
          fontColor={color ?? textColor}
          style={styles.cta}
        >
          {title ?? ''}
        </Text>
      )}
      {customRightElement}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  long: { width: undefined },
  medium: {
    width: 182,
  },
  short: {
    width: resize(152),
  },
  cta: { lineHeight: 24 },
});
export default Button;
