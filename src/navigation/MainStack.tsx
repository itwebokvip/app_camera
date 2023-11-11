import React from 'react';

import {CreateProgram, DetailedProgram, Home} from 'screens';

import {headerDefaultOptions, screenOptionsStack} from 'common';
import {MainStackParamList} from 'root-stack-params';
import {createStackNavigator} from '@react-navigation/stack';

const MainNavigator = () => {
  const MainStack = createStackNavigator<MainStackParamList>();
  return (
    <MainStack.Navigator
      screenOptions={headerDefaultOptions}
      initialRouteName={'home'}>
      <MainStack.Screen
        options={screenOptionsStack}
        name={'home'}
        component={Home}
      />
      <MainStack.Screen
        name={'detailedProgram'}
        component={DetailedProgram}
        options={{headerTitle: 'Detailed Program'}}
      />
      <MainStack.Screen
        name={'createProgram'}
        component={CreateProgram}
        options={{headerTitle: 'Create Program'}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
