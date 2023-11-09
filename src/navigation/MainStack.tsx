import React from 'react';

import {Home} from 'screens';
import {screenOptionsStack} from 'common';
import {MainStackParamList} from 'root-stack-params';
import {createStackNavigator} from '@react-navigation/stack';

const MainNavigator = () => {
  const MainStack = createStackNavigator<MainStackParamList>();
  return (
    <MainStack.Navigator
      screenOptions={screenOptionsStack}
      initialRouteName={'home'}>
      <MainStack.Screen name={'home'} component={Home} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
