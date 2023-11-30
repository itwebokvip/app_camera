import React from 'react';
import { View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import History from './components/History';
import MyTabBar from './components/CustomJobTabBar';
import TodayPrograms from './components/TodayPrograms';

import styles from './styles';
import { DemoTitle } from 'components';
import { ProgramTabParamList } from './types';
import { ScreenProps } from 'root-stack-params';

const Stack = createMaterialTopTabNavigator<ProgramTabParamList>();

const FuncComponent: React.FC<ScreenProps<'detailedProgram'>> = ({ route }) => {
  return (
    <View style={styles.containerDetail}>
      <DemoTitle>Thông tin chương trình</DemoTitle>
      <Stack.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          swipeEnabled: false,
          lazy: true,
        }}
        backBehavior={'none'}>
        <Stack.Screen
          name={'today'}
          component={TodayPrograms}
          options={{ tabBarLabel: 'Thông tin' }}
          initialParams={route.params}
        />
        <Stack.Screen
          name={'history'}
          component={History}
          options={{ tabBarLabel: 'Lịch sử' }}
          initialParams={route.params}
        />
      </Stack.Navigator>
    </View>
  );
};

export default FuncComponent;
