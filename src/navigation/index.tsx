import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {Loading} from 'components';

import {colors} from 'core';
import {screenOptionsStack} from 'common';
import {RootStackParamList} from 'root-stack-params';
import {goReset, setTopLevelNavigator} from 'helpers/navigation';

import HomeNavigator from './MainStack';
import AuthNavigator from './AuthNavigator';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';
import {SetTokenToGetWay} from 'service /GetWay';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundScreen,
  },
};

export default function Navigation() {
  const initScreen = async () => {
    const token = await KeychainManager.getItem(STORAGE_KEYS.token);
    if (token) {
      SetTokenToGetWay({token});
      goReset('main');
    } else {
      goReset('auth');
    }
  };
  return (
    <>
      <NavigationContainer
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
        theme={theme}
        onReady={initScreen}>
        <RootNavigator />
      </NavigationContainer>
      <Loading ref={refs => Loading.setRef(refs)} />
    </>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionsStack}>
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="main" component={HomeNavigator} />
    </Stack.Navigator>
  );
}
