import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import {Style, colors, sizes} from 'core';
import Device from 'utils/Device';

export const defaultHeaderHeight = Device.setHeaderHeight(sizes.s80);

export const screenOptionsStack: StackNavigationOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyle: {
    backgroundColor: 'white',
  },
  headerShown: false,
};

export const headerDefaultOptions: any = {
  headerStyle: {
    height: defaultHeaderHeight,
    backgroundColor: colors.bluePrimary,
  },
  headerTintColor: 'white',
  headerShown: true,

  headerTitleStyle: {
    ...Style.h4,
    color: colors.white,
    textAlign: 'left',
  },
};
