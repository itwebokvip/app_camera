import React from 'react';

import {
  Home,
  CreateProgram,
  DetailedProgram,
  UpdateImageProgram,
} from 'screens';

import { headerDefaultOptions, screenOptionsStack } from 'common';
import { MainStackParamList } from 'root-stack-params';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from 'screens/profile';
import styles from 'screens/create-program/styles';

const MainNavigator = () => {
  const MainStack = createStackNavigator<MainStackParamList>();
  return (
    <MainStack.Navigator
      screenOptions={headerDefaultOptions}
      initialRouteName={'detailedProgram'}>
      <MainStack.Screen
        options={screenOptionsStack}
        name={'home'}
        component={Home}
      />
      <MainStack.Screen
        name={'detailedProgram'}
        component={DetailedProgram}
        options={{ headerShown: false, }}
      />
      <MainStack.Screen
        name={'editProgramImage'}
        component={UpdateImageProgram}
        options={{ headerTitle: 'Cập nhật hình ảnh chương trình', headerStyle: { backgroundColor: 'black' } }}
      // options={{headerShown: false}}
      />
      <MainStack.Screen
        name={'profileScreen'}
        component={ProfileScreen}
        options={{ headerTitle: 'Thông tin người dùng', headerStyle: { backgroundColor: 'black' } }}
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
