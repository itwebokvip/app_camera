import {Style, colors, sizes} from 'core';
import {StyleSheet, Dimensions} from 'react-native';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
  },
  containerDetail: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBar: {
    ...Style.flex,
    alignItems: 'center',
    marginHorizontal: sizes.s18,
    paddingVertical: sizes.s13,
  },
  activeTabBar: {
    backgroundColor: colors.semanticsWarning,
    borderRadius: sizes.s50,
  },
  label: {
    ...Style.txt16_bold,
    fontWeight: '700',
    color: colors.black,
  },
  topTabContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  containerImageRadius: {
    borderRadius: sizes.s20,
    elevation: 5,
    shadowColor: colors.gray100,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: sizes.s14,
    marginRight: sizes.s16,
  },
  image: {
    width: Dimensions.get('screen').width,
    position: 'relative',
    height: win.width / 0.98,
    backgroundColor:'red'
  },
  detailedImageTxt: {
    color: 'white',
    padding: sizes.s14,
    fontWeight: '600',
  },
  btnDelete: {
    top: sizes.s15,
    right: sizes.s25,
    position: 'absolute',
  },

  carouselContainer: {
    marginTop: sizes.s10,
  },
  carouselContentContainer: {
    paddingHorizontal: sizes.s10,
  },
});

export default styles;
