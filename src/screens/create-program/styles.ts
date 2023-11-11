import {colors, sizes} from 'core';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundScreen,
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
