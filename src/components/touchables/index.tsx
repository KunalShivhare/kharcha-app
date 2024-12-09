import React from 'react';
import {
  TouchableOpacity as NativeTouchableOpacity,
  Insets,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { debounce } from '../../utilities/codeUtils';
import { useTheme } from '../themes/hooks';

const TouchableOpacity = ({
  children,
  onPress = () => {},
  hitSlop,
  style,
  ripleSize,
  activeOpacity,
  ...props
}: TouchableOpacityProps & {
  children: Element;
  onPress?: () => void;
  hitSlop?: Insets;
  style?: StyleProp<ViewStyle>;
  ripleSize?: number;
  activeOpacity?: number;
}) => {
  const hitslop = { left: 5, right: 5, top: 5, bottom: 5 };
  const onClick = debounce(onPress, 500, true);

  const { colors } = useTheme();

  const rippleStyle: ViewStyle = ripleSize
    ? {
        borderRadius: ripleSize,
        height: ripleSize,
        width: ripleSize,
      }
    : {};

  if (ripleSize) {
    return (
      <Pressable style={style} hitSlop={hitSlop ?? hitslop} onPress={onClick}>
        {({ pressed }) => (
          <>
            <View
              style={[
                styles.pressedState,
                rippleStyle,
                pressed && ripleSize ? { backgroundColor: colors.bgFillBrandSecondaryHover } : {},
              ]}
              {...props}
            >
              {children}
            </View>
          </>
        )}
      </Pressable>
    );
  } else {
    return (
      <NativeTouchableOpacity
        hitSlop={hitSlop ?? hitslop}
        style={style}
        onPress={onClick}
        activeOpacity={activeOpacity ?? 0.8}
        {...props}
      >
        {children}
      </NativeTouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  pressedState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { TouchableOpacity };
