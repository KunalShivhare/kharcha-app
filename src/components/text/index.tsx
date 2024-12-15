import React, { useContext } from 'react';
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import AppTheme from '../themes/apptheme';
import { TextToken, TextVariants } from './textToken';

export interface TextProps extends NativeTextProps {
  variant?: TextToken;
  fontColor?: string;
  children?: React.ReactElement | string;
  style?: StyleProp<TextStyle>;
  textAlign?: 'left' | 'center' | 'right' | undefined;
}

const TextComponent: React.FC<TextProps> = (props) => {
  const { style, children, fontColor, variant, textAlign, ...restProps } = props;
  const theme = useContext(AppTheme);

  const mergedStyle = [
    TextVariants[variant],
    style,
    {
      color: fontColor ?? theme.colors.primaryText,
    },
    !!textAlign && { textAlign },
  ];
  return (
    <NativeText {...restProps} style={mergedStyle}>
      {children}
    </NativeText>
  );
};

const Text = React.memo(TextComponent);

export { Text };
export type { TextToken };
