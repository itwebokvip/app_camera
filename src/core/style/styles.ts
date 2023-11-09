import {StyleSheet} from 'react-native';

import sizes, {screenWidth} from '../size/sizes';
import {colors} from './colors';
import {fonts} from './fonts';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.s20,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  txtCenter: {
    textAlign: 'center',
  },
  txtRight: {
    textAlign: 'right',
  },
  //
  h1: {
    fontSize: sizes.s48,
    lineHeight: sizes.s56,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  h2: {
    fontSize: sizes.s40,
    lineHeight: sizes.s48,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  h3: {
    fontSize: sizes.s32,
    lineHeight: sizes.s40,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  h4: {
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  h5: {
    fontSize: sizes.s20,
    lineHeight: sizes.s32,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  h6: {
    fontSize: sizes.s18,
    lineHeight: sizes.s24,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  txt10: {
    fontSize: sizes.s10,
    lineHeight: sizes.s12,
    fontFamily: fonts.regular,
    color: colors.gray73,
  },
  txt10_gray600: {
    fontSize: sizes.s10,
    lineHeight: sizes.s12,
    fontFamily: fonts.regular,
    color: colors.gray600,
  },
  txt10_gray700: {
    fontSize: sizes.s10,
    lineHeight: sizes.s12,
    fontFamily: fonts.regular,
    color: colors.gray700,
  },
  txt12: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.gray1000,
  },
  txt12_blue: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.bluePrimary,
  },
  txt12_gray500: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.gray500,
  },
  txt12_gray800: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.gray800,
  },
  txt12_gray1000: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.gray1000,
  },
  txt12_bold_gray800: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.bold,
    color: colors.gray800,
  },
  txt12_white: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  txt12_secondary: {
    fontSize: sizes.s12,
    lineHeight: sizes.s16,
    fontFamily: fonts.regular,
  },
  txt14: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.gray1000,
  },
  txt14_gray600: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.gray600,
  },
  txt14_gray800: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.gray800,
  },
  txt14_blue: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.bluePrimary,
  },
  txt14_blue_bold: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.bluePrimary,
  },
  txt14_bold_gray: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.gray73,
  },
  txt14_bold_gray700: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.gray700,
  },
  txt14_bold_gray800: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.gray800,
  },
  txt14_bold_gray1000: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.gray1000,
  },
  txt14_bold_error: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.error,
  },
  txt14_black: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  txt14_bold_black: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  txt14_bold_grey: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.gray1000,
  },
  txt14_bold_green: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.green75,
  },
  txt14_bold_blue: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.bold,
    color: colors.app,
  },
  txt14_white: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  txt14_secondary: {
    fontSize: sizes.s14,
    lineHeight: sizes.s20,
    fontFamily: fonts.regular,
    color: colors.secondary_text,
  },
  txt16: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.gray1000,
    fontFamily: fonts.regular,
  },
  txt16_black: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.gray1000,
    fontFamily: fonts.regular,
  },
  txt16_secondary: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.regular,
    color: colors.secondary_text,
  },
  txt16_blue: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.bluePrimary,
    fontFamily: fonts.regular,
  },
  txt16_green: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.appGreen,
    fontFamily: fonts.regular,
  },
  txt16_bold_blue: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.bluePrimary,
    fontFamily: fonts.bold,
  },
  txt16_bold_green: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.appGreen,
    fontFamily: fonts.bold,
  },
  txt16_black_bold: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  txt16_bold: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.bold,
    color: colors.gray1000,
  },
  txt16_bold_white: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.bold,
    color: colors.white,
  },

  txt16_white: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  txt16_white_bold: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  txt16_gray: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.regular,
    color: colors.gray1000,
  },
  txt16_gray500: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.regular,
    color: colors.gray500,
  },
  txt16_gray800: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.regular,
    color: colors.gray800,
  },
  txt16_bold_gray800: {
    fontSize: sizes.s16,
    lineHeight: sizes.s24,
    fontFamily: fonts.bold,
    color: colors.gray800,
  },
  txt20: {
    color: colors.black,
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
  },
  txt20_bold_blue: {
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
    color: colors.bluePrimary,
  },
  txt20_bold_black: {
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
    color: colors.gray1000,
  },
  txt20_bold_green: {
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
    color: colors.green1000,
  },
  txt20_gray: {
    color: colors.gray73,
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
  },
  txt20_gray1000: {
    color: colors.gray1000,
    fontSize: sizes.s20,
    lineHeight: sizes.s28,
    fontFamily: fonts.bold,
  },
  txt24: {
    color: colors.white,
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    fontFamily: fonts.regular,
  },
  txt24_bold: {
    color: colors.white,
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    fontFamily: fonts.bold,
  },
  txt24_black: {
    color: colors.black,
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    fontFamily: fonts.bold,
  },
  txt24_primary: {
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    color: colors.bluePrimary,
    fontFamily: fonts.bold,
  },
  txt24_green: {
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    color: colors.appGreen,
    fontFamily: fonts.bold,
  },
  txt24_gray: {
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    color: colors.gray1000,
    fontFamily: fonts.bold,
  },
  txt32_bold_black: {
    fontSize: sizes.s32,
    lineHeight: sizes.s40,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  regular: {
    fontFamily: fonts.regular,
  },
  semibold: {
    fontFamily: fonts.semi_bold,
  },
  bold: {
    fontFamily: fonts.bold,
  },

  //header style
  headerStyle: {
    fontSize: sizes.s24,
    lineHeight: sizes.s32,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  //
  border: {
    borderWidth: sizes.s1,
    borderRadius: sizes.s8,
    borderColor: colors.gray400,
  },
  borderBottom: {
    borderBottomWidth: sizes.s1,
    // borderBottomColor: colors.divider,
  },
  borderTop: {
    borderTopWidth: sizes.s1,
    // borderTopColor: colors.divider,
  },
  shadow1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  shadow2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  shadow3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  shadow5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadow10: {
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  block_center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column_center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_start: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  row_end: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  row_center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row_around: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row_evenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden',
  },
  row_wrap_center: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
    alignContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  column_end: {
    alignItems: 'flex-end',
  },
  column_between: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon12: {width: sizes.s12, height: sizes.s12},
  icon14: {width: sizes.s14, height: sizes.s14},
  icon16: {width: sizes.s16, height: sizes.s16},
  icon16_radius: {width: sizes.s16, height: sizes.s16, borderRadius: sizes.s16},
  icon18: {width: sizes.s18, height: sizes.s18},
  icon20: {width: sizes.s20, height: sizes.s20},
  icon20_radius: {width: sizes.s20, height: sizes.s20, borderRadius: sizes.s20},
  icon22: {width: sizes.s22, height: sizes.s22},
  icon24: {width: sizes.s24, height: sizes.s24},
  icon24_radius: {width: sizes.s24, height: sizes.s24, borderRadius: sizes.s24},
  icon28: {width: sizes.s28, height: sizes.s28},
  icon32: {width: sizes.s32, height: sizes.s32},
  icon32_radius: {width: sizes.s32, height: sizes.s32, borderRadius: sizes.s32},
  icon36: {width: sizes.s36, height: sizes.s36},
  icon40: {width: sizes.s40, height: sizes.s40},
  icon45: {width: sizes.s45, height: sizes.s45},
  icon48: {width: sizes.s48, height: sizes.s48},
  icon56: {width: sizes.s56, height: sizes.s56},
  icon64: {width: sizes.s64, height: sizes.s64},
  icon72: {width: sizes.s72, height: sizes.s72},
  icon76: {width: sizes.s76, height: sizes.s76},
  icon80: {width: sizes.s80, height: sizes.s80},
  icon88: {width: sizes.s88, height: sizes.s88},
  icon96: {width: sizes.s96, height: sizes.s96},
  icon120: {width: sizes.s120, height: sizes.s120},
  icon140: {width: sizes.s140, height: sizes.s140},
  icon160: {width: sizes.s160, height: sizes.s160},

  top2: {marginTop: sizes.s2},
  left2: {marginLeft: sizes.s2},
  right2: {marginRight: sizes.s2},
  bottom2: {marginBottom: sizes.s2},

  top4: {marginTop: sizes.s4},
  left4: {marginLeft: sizes.s4},
  right4: {marginRight: sizes.s4},
  bottom4: {marginBottom: sizes.s4},

  top6: {marginTop: sizes.s6},
  left6: {marginLeft: sizes.s6},
  right6: {marginRight: sizes.s6},
  bottom6: {marginBottom: sizes.s6},

  top8: {marginTop: sizes.s8},
  left8: {marginLeft: sizes.s8},
  right8: {marginRight: sizes.s8},
  bottom8: {marginBottom: sizes.s8},

  top10: {marginTop: sizes.s10},
  left10: {marginLeft: sizes.s10},
  right10: {marginRight: sizes.s10},
  bottom10: {marginBottom: sizes.s10},

  top12: {marginTop: sizes.s12},
  left12: {marginLeft: sizes.s12},
  right12: {marginRight: sizes.s12},
  bottom12: {marginBottom: sizes.s12},

  top14: {marginTop: sizes.s14},
  left14: {marginLeft: sizes.s14},
  right14: {marginRight: sizes.s14},
  bottom14: {marginBottom: sizes.s14},

  top16: {marginTop: sizes.s16},
  left16: {marginLeft: sizes.s16},
  right16: {marginRight: sizes.s16},
  bottom16: {marginBottom: sizes.s16},

  top20: {marginTop: sizes.s20},
  left20: {marginLeft: sizes.s20},
  right20: {marginRight: sizes.s20},
  bottom20: {marginBottom: sizes.s20},

  top24: {marginTop: sizes.s24},
  left24: {marginLeft: sizes.s24},
  right24: {marginRight: sizes.s24},
  bottom24: {marginBottom: sizes.s24},

  top32: {marginTop: sizes.s32},
  left32: {marginLeft: sizes.s32},
  right32: {marginRight: sizes.s32},
  bottom32: {marginBottom: sizes.s32},

  top40: {marginTop: sizes.s40},
  left40: {marginLeft: sizes.s40},
  right40: {marginRight: sizes.s40},
  bottom40: {marginBottom: sizes.s40},

  top48: {marginTop: sizes.s48},
  left48: {marginLeft: sizes.s48},
  right48: {marginRight: sizes.s48},
  bottom48: {marginBottom: sizes.s48},

  top64: {marginTop: sizes.s64},
  left64: {marginLeft: sizes.s64},
  right64: {marginRight: sizes.s64},
  bottom64: {marginBottom: sizes.s64},
  // padding
  p4: {padding: sizes.s4},
  p6: {padding: sizes.s6},
  p8: {padding: sizes.s8},
  p10: {padding: sizes.s10},
  p12: {padding: sizes.s12},
  p14: {padding: sizes.s14},
  p16: {padding: sizes.s16},
  p20: {padding: sizes.s20},
  p24: {padding: sizes.s24},

  // padding horizontal
  ph6: {paddingHorizontal: sizes.s6},
  ph8: {paddingHorizontal: sizes.s8},
  ph10: {paddingHorizontal: sizes.s10},
  ph12: {paddingHorizontal: sizes.s12},
  ph14: {paddingHorizontal: sizes.s14},
  ph16: {paddingHorizontal: sizes.s16},
  ph20: {paddingHorizontal: sizes.s20},
  ph24: {paddingHorizontal: sizes.s24},
  ph30: {paddingHorizontal: sizes.s30},
  ph58: {paddingHorizontal: sizes.s58},

  // padding vertical
  pv0: {paddingVertical: 0},
  pv8: {paddingVertical: sizes.s8},
  pv10: {paddingVertical: sizes.s10},
  pv12: {paddingVertical: sizes.s12},
  pv14: {paddingVertical: sizes.s14},
  pv16: {paddingVertical: sizes.s16},
  pv20: {paddingVertical: sizes.s20},
  pv24: {paddingVertical: sizes.s24},
  pv36: {paddingVertical: sizes.s36},
  pv48: {paddingVertical: sizes.s48},

  // margin vertical
  mv8: {marginVertical: sizes.s8},
  mv10: {marginVertical: sizes.s10},
  mv12: {marginVertical: sizes.s12},
  mv14: {marginVertical: sizes.s14},
  mv16: {marginVertical: sizes.s16},
  mv20: {marginVertical: sizes.s20},
  mv24: {marginVertical: sizes.s24},

  // margin horizontal
  mh8: {marginHorizontal: sizes.s8},
  mh10: {marginHorizontal: sizes.s10},
  mh12: {marginHorizontal: sizes.s12},
  mh14: {marginHorizontal: sizes.s14},
  mh16: {marginHorizontal: sizes.s16},
  mh20: {marginHorizontal: sizes.s20},
  mh24: {marginHorizontal: sizes.s24},

  radius8: {borderRadius: sizes.s8},
  radius12: {borderRadius: sizes.s12},
  radius16: {borderRadius: sizes.s16},
  radius24: {borderRadius: sizes.s24},

  // custom style for navigator
  imagePicker: {
    backgroundColor: 'transparent',
    // marginHorizontal: sizes.s24,
  },

  // hit slop
  hitSlop4: {top: 4, right: 4, bottom: 4, left: 4},

  toastStyle: {
    borderLeftWidth: 0,
    zIndex: 10000,
    borderRadius: sizes.s8,
    paddingLeft: sizes.s12,
    width: screenWidth * 0.9,
  },

  h100: {
    height: '100%',
  },
  w100: {
    width: '100%',
  },
});
