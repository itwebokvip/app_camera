import { Style, colors, sizes } from 'core';
import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  tabBar: {
    ...Style.flex,
    alignItems: 'center',
    paddingVertical: sizes.s13,
  },
  activeTabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: sizes.s12,
    borderTopRightRadius: sizes.s12,
    borderBottomLeftRadius: sizes.s12,
    borderBottomRightRadius: sizes.s12,
  },
  label: {
    ...Style.txt16_bold,
    color: colors.semanticsWarning,
  },
  topTabContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    // borderBottomLeftRadius: sizes.s12,
    // borderBottomRightRadius: sizes.s12,
    backgroundColor: colors.black,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: sizes.s14,
  },
  image: {
    width: 400,
    position: 'relative',
    height: win.width / 0.98,
  },
  detailedImageTxt: {
    color: 'red',
    padding: sizes.s14,
    fontWeight: '600',
  },
  btnDelete: {
    top: sizes.s15,
    right: sizes.s25,
    position: 'absolute',
  },
});

export default styles;
