import React from 'react';
import {View} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MyTabBar from './components/CustomJobTabBar';

import styles from './styles';
import {ProgramTabParamList} from './types';
import {ScreenProps} from 'root-stack-params';
import TodayPrograms from './components/TodayPrograms';
import History from './components/History';

const Stack = createMaterialTopTabNavigator<ProgramTabParamList>();

const FuncComponent: React.FC<ScreenProps<'detailedProgram'>> = () => {
  const isFocused = useIsFocused();

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
          options={{tabBarLabel: 'Today Programs'}}
          //@ts-ignore
          // initialParams={}
        />
        <Stack.Screen
          name={'history'}
          component={History}
          //@ts-ignore
          // initialParams={{}}
          options={{tabBarLabel: 'History'}}
        />
      </Stack.Navigator>
    </View>
  );
};

export default FuncComponent;
