import {Style, colors, sizes} from 'core';
import {StyleSheet} from 'react-native';

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
  },
  label: {
    ...Style.txt16_bold,
    color: colors.white,
  },
  topTabContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    borderBottomLeftRadius: sizes.s12,
    borderBottomRightRadius: sizes.s12,
    backgroundColor: colors.bluePrimary,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: sizes.s14,
  },
  image: {
    width: 300,
    height: 300,
  },
  detailedImageTxt: {
    color: 'red',
    padding: sizes.s10,
    fontWeight: '600',
  },
  btnDelete: {
    top: sizes.s10,
    right: sizes.s10,
    position: 'absolute',
  },
});

export default styles;
