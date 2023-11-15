import React from 'react';

import { CreateProgram, DetailedProgram, Home, UpdateImageProgram } from 'screens';

import { headerDefaultOptions, screenOptionsStack } from 'common';
import { MainStackParamList } from 'root-stack-params';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from 'screens/profile';

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
        options={{ headerTitle: 'Chi tiết chương trình' }}
      />
      <MainStack.Screen
        name={'editProgramImage'}
        component={UpdateImageProgram}
        options={{ headerTitle: 'Cập nhật hình ảnh chương trình' }}
      />
      <MainStack.Screen
        name={'profileScreen'}
        component={ProfileScreen}
        options={{ headerTitle: 'Thông tin người dùng' }}
      />
      <MainStack.Screen
        name={'createProgram'}
        component={CreateProgram}
        options={{ headerTitle: 'Tạo chương trình' }}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
