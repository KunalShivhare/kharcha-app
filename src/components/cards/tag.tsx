import React, { ReactChild } from 'react';
import { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../themes/hooks';
import { Text, TextToken } from '../text';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { getBGColor } from '@/src/utils/styles';

interface TagProps {
  type: 'lent' | 'borrowed' | 'settled';
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
  showPointer?: boolean;
}

const Tag: React.FC<TagProps> = ({
  type,
  size,
  title,
  width,
  customStyle,
  customRightElement,
  color,
  textVariant,
  showPointer,
}) => {
  const theme = useTheme();

  const borderColor = useMemo<string>(() => getBGColor(type), [theme, type]);

  const tagStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: getBGColor(type),
      width,
      ...customStyle,
      borderColor,
      borderWidth: 1,
    }),
    [theme, type, , width, customStyle]
  );

  const textColor = useMemo<string>(
    () => (type === 'lent' ? COLORS.light100 : COLORS.orange),
    [theme, type]
  );

  return (
    <View style={[styles.base, styles[size], tagStyle]}>
      <View style={styles.textContainer}>
        {showPointer ? <View style={styles.pointer} /> : null}
        <Text
          variant={textVariant ?? 'label2_semibold'}
          fontColor={color ?? textColor}
          style={styles.tag}
        >
          {title ?? ''}
        </Text>
      </View>
      {customRightElement}
    </View>
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
  tag: { lineHeight: 24, textTransform: 'capitalize' },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: resize(4),
  },
  pointer: { height: resize(4), width: resize(4), backgroundColor: 'white', borderRadius: 50 },
});
export default Tag;
