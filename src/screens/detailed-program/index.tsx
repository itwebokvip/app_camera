import React from 'react';
import {View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import History from './components/History';
import MyTabBar from './components/CustomJobTabBar';
import TodayPrograms from './components/TodayPrograms';

import styles from './styles';
import {ProgramTabParamList} from './types';
import {ScreenProps} from 'root-stack-params';

const Stack = createMaterialTopTabNavigator<ProgramTabParamList>();

const FuncComponent: React.FC<ScreenProps<'detailedProgram'>> = ({route}) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          lazy: true,
          swipeEnabled: false,
        }}
        backBehavior={'none'}>
        <Stack.Screen
          name={'today'}
          component={TodayPrograms}
          options={{tabBarLabel: 'Info'}}
          initialParams={route.params}
        />
        <Stack.Screen
          name={'history'}
          component={History}
          options={{tabBarLabel: 'History'}}
          initialParams={route.params}
        />
      </Stack.Navigator>
    </View>
  );
};

export default FuncComponent;
