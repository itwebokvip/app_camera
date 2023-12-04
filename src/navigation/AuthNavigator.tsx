import React from 'react';
import {Login, Welcome, Register} from 'screens';
import {screenOptionsStack} from 'common';
import {AuthStackParamList} from 'root-stack-params';
import {createStackNavigator} from '@react-navigation/stack';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator
      screenOptions={screenOptionsStack}
      initialRouteName={'welcome'}>
      <AuthStack.Screen name={'welcome'} component={Welcome} />
      <AuthStack.Screen name={'login'} component={Login} />
      <AuthStack.Screen name={'register'} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
