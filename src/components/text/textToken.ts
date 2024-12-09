import { StyleSheet, TextStyle } from 'react-native';
import { FONT_SIZE, LINE_HEIGHT } from '../themes/globalStyles';
import TYPOGRAPHY from '../themes/typography';

export type TextToken =
  | 'display_bold'
  | 'display1_semibold'
  | 'heading1_bold'
  | 'heading1_semibold'
  | 'heading1_regular'
  | 'heading2_bold'
  | 'heading2_semibold'
  | 'heading3_bold'
  | 'heading3_semibold'
  | 'heading3_regular'
  | 'heading4_bold'
  | 'heading4_semibold'
  | 'heading4_regular'
  | 'heading5_bold'
  | 'heading5_semibold'
  | 'label1_semibold'
  | 'label1_medium'
  | 'label1_regular'
  | 'label2_bold'
  | 'label2_semibold'
  | 'label2_medium'
  | 'label2_regular'
  | 'label3_bold'
  | 'label3_semibold'
  | 'label3_medium'
  | 'label3_regular'
  | 'label4_semibold'
  | 'label4_medium'
  | 'label4_regular'
  | 'body1_semibold'
  | 'body1_regular'
  | 'body2_semibold'
  | 'body2_regular'
  | 'body3_semibold'
  | 'body3_regular'
  | 'tiny_regular'
  | 'tiny_medium'
  | 'tiny_uppercase'
  | 'tiny_semibold';

export type TextVariantProps = {
  [key in TextToken]: TextStyle;
};

const TextVariants: TextVariantProps = StyleSheet.create({
  display_bold: {
    fontSize: FONT_SIZE.xxxxxxl,
    lineHeight: LINE_HEIGHT.xxxxxxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
    letterSpacing: 0.02,
  },
  display1_semibold: {
    fontSize: FONT_SIZE.xxxxxxl,
    lineHeight: LINE_HEIGHT.xxxxxxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
    letterSpacing: 0.02,
  },
  heading1_bold: {
    fontSize: FONT_SIZE.xxxxxl,
    lineHeight: LINE_HEIGHT.xxxxxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  heading1_semibold: {
    fontSize: FONT_SIZE.xxxxxl,
    lineHeight: LINE_HEIGHT.xxxxxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  heading1_regular: {
    fontSize: FONT_SIZE.xxxxxl,
    lineHeight: LINE_HEIGHT.xxxxxxl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  heading2_bold: {
    fontSize: FONT_SIZE.xxxxl,
    lineHeight: LINE_HEIGHT.xxxxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  heading2_semibold: {
    fontSize: FONT_SIZE.xxxxl,
    lineHeight: LINE_HEIGHT.xxxxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  heading3_bold: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  heading3_semibold: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  heading3_regular: {
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxxl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  heading4_bold: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  heading4_semibold: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  heading4_regular: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxxl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  heading5_bold: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xxxxl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  heading5_semibold: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xxxxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  label1_semibold: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  label1_medium: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: TYPOGRAPHY.Font.Medium,
  },
  label1_regular: {
    fontSize: FONT_SIZE.xl,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  label2_bold: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  label2_semibold: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  label2_medium: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Medium,
  },
  label2_regular: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  label3_bold: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.Bold,
  },
  label3_semibold: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  label3_medium: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.Medium,
  },
  label3_regular: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  label4_semibold: {
    fontSize: FONT_SIZE.s,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  label4_medium: {
    fontSize: FONT_SIZE.s,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Medium,
  },
  label4_regular: {
    fontSize: FONT_SIZE.s,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  body1_semibold: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  body1_regular: {
    fontSize: FONT_SIZE.l,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  body2_semibold: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  body2_regular: {
    fontSize: FONT_SIZE.m,
    lineHeight: LINE_HEIGHT.xl,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  body3_semibold: {
    fontSize: FONT_SIZE.s,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  body3_regular: {
    fontSize: FONT_SIZE.s,
    lineHeight: LINE_HEIGHT.l,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  tiny_semibold: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xxs,
    fontFamily: TYPOGRAPHY.Font.SemiBold,
  },
  tiny_regular: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    fontFamily: TYPOGRAPHY.Font.Regular,
  },
  tiny_medium: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    fontFamily: TYPOGRAPHY.Font.Medium,
  },
  tiny_uppercase: {
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    fontFamily: TYPOGRAPHY.Font.Medium,
    textTransform: 'uppercase',
  },
});

export { TextVariants };
