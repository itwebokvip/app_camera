import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

export const screenOptionsStack: StackNavigationOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyle: {
    backgroundColor: 'white',
  },
  headerShown: false,
};
