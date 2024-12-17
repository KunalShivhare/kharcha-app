import { Platform, StyleSheet } from 'react-native';
import TYPOGRAPHY from './typography';

const Layout = StyleSheet.create({
  SafeArea: {
    flex: 1,
    // backgroundColor: TYPOGRAPHY.Color.default,
  },
  statusBar: {
    width: '100%',
    // height: height * 0.07,
  },
  iconPressArea: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  pageContainer: {
    padding: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex2: {
    flex: 2,
  },
  spaceEvenly: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyFlexEnd: {
    justifyContent: 'flex-end',
  },
  alignFlexEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  shadow: {
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: { width: 2, height: 2 },
    elevation: Platform.OS === 'ios' ? 0 : 7,
  },
  bottomCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 19,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  bottomShadow: {
    ...Platform.select({
      ios: {
        shadowColor: TYPOGRAPHY.Color.black,
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  overlay: {},
  overflowHidden: {
    overflow: 'hidden',
  },
  mb0: {
    marginBottom: 0,
  },
  rowCentering: { flexDirection: 'row', alignItems: 'center' },
  mb16: { marginBottom: 16 },
  mb20: {
    marginBottom: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb6: {
    marginBottom: 6,
  },
  mb8: {
    marginBottom: 8,
  },
  mb32: {
    marginBottom: 32,
  },
  ph10: { paddingHorizontal: 10 },
  mb24: {
    marginBottom: 24,
  },
  mt8: {
    marginTop: 8,
  },
  mt16: {
    marginTop: 16,
  },
  mb22: {
    marginBottom: 22,
  },
  mb28: {
    marginBottom: 28,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const Shadow = StyleSheet.create({
  dropShadow: {
    shadowRadius: 4,
    elevation: Platform.OS === 'ios' ? 0 : 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
  },
  boxShadow: {
    shadowRadius: 12,
    elevation: Platform.OS === 'ios' ? 0 : 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
  },
  topDropShadow: {
    shadowRadius: 3,
    elevation: Platform.OS === 'ios' ? 0 : 4,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
  },
});

const textStyle = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  alignCenterText: {
    textAlign: 'center',
  },
  opacity3: {
    opacity: 0.3,
  },
  opacity35: {
    opacity: 0.35,
  },
  opacity6: {
    opacity: 0.6,
  },
  opacity7: {
    opacity: 0.7,
  },
});

enum FONT_SIZE {
  xxs = 8,
  xs = 10,
  s = 12,
  m = 14,
  l = 16,
  xl = 18,
  xxl = 20,
  xxxl = 24,
  xxxxl = 28,
  xxxxxl = 32,
  xxxxxxl = 36,
}

enum LINE_HEIGHT {
  xxs = 10,
  xs = 12,
  s = 14,
  m = 16,
  l = 18,
  xl = 20,
  xxl = 22,
  xxxl = 24,
  xxxxl = 28,
  xxxxxl = 34,
  xxxxxxl = 38,
  xxxxxxxl = 44,
}
const padding = StyleSheet.create({
  t0: {
    paddingTop: 0,
  },
  t2: {
    paddingTop: 2,
  },
  t4: {
    paddingTop: 4,
  },
  t12: {
    paddingTop: 12,
  },
  t16: {
    paddingTop: 16,
  },
  t24: {
    paddingTop: 24,
  },
  b4: {
    paddingBottom: 4,
  },
  b12: {
    paddingBottom: 12,
  },
  b14: {
    paddingBottom: 14,
  },
  b50: {
    paddingBottom: 50,
  },
  b72: {
    paddingBottom: 62,
  },
  b200: {
    paddingBottom: 200,
  },
  l6: {
    paddingLeft: 6,
  },
  l16: {
    paddingLeft: 16,
  },
  l12: {
    paddingLeft: 12,
  },
  r2: {
    paddingRight: 2,
  },
  r6: {
    paddingRight: 6,
  },
  r12: {
    paddingRight: 12,
  },
  t90: {
    paddingTop: 90,
  },
  h4: {
    paddingHorizontal: 4,
  },
  h6: {
    paddingHorizontal: 6,
  },
  h8: {
    paddingHorizontal: 8,
  },
  h10: {
    paddingHorizontal: 10,
  },
  h12: {
    paddingHorizontal: 12,
  },
  h16: {
    paddingHorizontal: 16,
  },
  h18: {
    paddingHorizontal: 18,
  },
  h28: {
    paddingHorizontal: 28,
  },
  v1: {
    paddingVertical: 1,
  },
  v2: {
    paddingVertical: 2,
  },
  v4: {
    paddingVertical: 4,
  },
  v6: {
    paddingVertical: 6,
  },
  v8: {
    paddingVertical: 8,
  },
  v10: {
    paddingVertical: 10,
  },
  v12: {
    paddingVertical: 12,
  },
  v13: {
    paddingVertical: 13,
  },
  v14: {
    paddingVertical: 14,
  },
  v16: {
    paddingVertical: 16,
  },
  v24: {
    paddingVertical: 24,
  },
  v32: {
    paddingVertical: 32,
  },
  v40: {
    paddingVertical: 40,
  },
});

const margin = StyleSheet.create({
  t0: {
    marginTop: 0,
  },
  t24: {
    marginTop: 24,
  },
  t28: {
    marginTop: 28,
  },
  t32: {
    marginTop: 32,
  },
  t60: {
    marginTop: 60,
  },
  t90: {
    marginTop: 90,
  },
  t50: {
    marginTop: 50,
  },
  t104: {
    marginTop: 104,
  },
  t8: {
    marginTop: 8,
  },
  t6: {
    marginTop: 6,
  },
  t4: {
    marginTop: 4,
  },
  t2: {
    marginTop: 2,
  },
  t12: {
    marginTop: 12,
  },
  t14: {
    marginTop: 14,
  },
  t16: {
    marginTop: 16,
  },
  t20: {
    marginTop: 20,
  },
  t40: {
    marginTop: 40,
  },

  r2: {
    marginRight: 2,
  },
  r4: {
    marginRight: 4,
  },
  r8: {
    marginRight: 8,
  },
  r14: {
    marginRight: 14,
  },
  r16: {
    marginRight: 16,
  },
  r24: {
    marginRight: 24,
  },
  r48: {
    marginRight: 48,
  },
  b8: {
    marginBottom: 8,
  },
  b12: {
    marginBottom: 12,
  },
  b16: {
    marginBottom: 16,
  },
  b24: {
    marginBottom: 24,
  },
  b20: {
    marginBottom: 20,
  },
  b32: {
    marginBottom: 32,
  },
  h0: {
    marginHorizontal: 0,
  },
  h4: {
    marginHorizontal: 4,
  },
  h8: {
    marginHorizontal: 8,
  },
  h12: {
    marginHorizontal: 12,
  },
  h14: {
    marginHorizontal: 14,
  },
  h16: {
    marginHorizontal: 16,
  },
  h28: {
    marginHorizontal: 28,
  },

  v8: {
    marginVertical: 8,
  },
  v10: {
    marginVertical: 10,
  },
  v12: {
    marginVertical: 12,
  },
  v13: {
    marginVertical: 13,
  },
  v16: {
    marginVertical: 16,
  },
  v32: {
    marginVertical: 32,
  },
  v34: {
    marginVertical: 34,
  },
  v40: {
    marginVertical: 40,
  },
  v60: {
    marginVertical: 60,
  },
  l4: {
    marginLeft: 4,
  },
  l6: {
    marginLeft: 6,
  },
  l8: {
    marginLeft: 8,
  },
  l12: {
    marginLeft: 12,
  },
  l16: {
    marginLeft: 16,
  },
  l20: {
    marginLeft: 20,
  },
  l28: {
    marginLeft: 28,
  },
  v4: {
    marginVertical: 4,
  },
});

const gap = StyleSheet.create({
  g2: {
    gap: 2,
  },
  g4: {
    gap: 4,
  },
  g6: {
    gap: 6,
  },
  g8: {
    gap: 8,
  },
  g10: {
    gap: 10,
  },
  g12: {
    gap: 12,
  },
  g14: {
    gap: 14,
  },
  g16: {
    gap: 16,
  },
  g18: {
    gap: 18,
  },
  g20: {
    gap: 20,
  },
});

const border = StyleSheet.create({
  b4: {
    borderRadius: 4,
  },
  b8: {
    borderRadius: 8,
  },
  b12: {
    borderRadius: 12,
  },
  b16: {
    borderRadius: 16,
  },
  b20: {
    borderRadius: 20,
  },
  b32: {
    borderRadius: 32,
  },
});

const borderWidth = StyleSheet.create({
  b1: {
    borderWidth: 1,
  },
  b1_5: { borderWidth: 1.5 },
  b2: {
    borderWidth: 2,
  },
});

const GLOBAL = {
  Layout,
  Shadow,
  LINE_HEIGHT,
  FONT_SIZE,
  padding,
  margin,
  gap,
};

export default GLOBAL;
export {
  Layout,
  Shadow,
  LINE_HEIGHT,
  FONT_SIZE,
  padding,
  margin,
  border,
  borderWidth,
  textStyle,
  gap,
};
