import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Loading, AppTextInput} from 'components';

import {SignIn} from '../../service ';
import ShowToast from 'helpers/ShowToast';
import {goReset} from 'helpers/navigation';
import {Style, colors, fonts, fontsizes, sizes} from 'core';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validationForm = useCallback(() => {
    if (email.length === 0) {
      ShowToast('error', 'Notice', 'Please input your email!');
      return false;
    }

    if (!email.match(EMAIL_REGEX)) {
      ShowToast('error', 'Notice', 'Invalid Email ID!');
      return false;
    }

    if (password.length === 0) {
      ShowToast('error', 'Notice', 'Please input your password!');
      return false;
    }

    return true;
  }, [email, password.length]);

  const handleLogin = useCallback(async () => {
    try {
      const isValid = validationForm();
      if (!isValid) return;

      Loading.show();
      const [result] = await Promise.all([SignIn(email, password)]);
      if (result.Success === true) {
        goReset('main');
      } else {
        ShowToast('error', 'Notice', result.errors);
      }
    } catch (error) {
      ShowToast('error', 'Notice', 'Something went wrong!');
    } finally {
      Loading.hide();
    }
  }, [email, password, validationForm]);

  return (
    <View style={Style.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={Style.pv36}>
        <AppTextInput
          placeholder="Email"
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <AppTextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={text => {
            setPassword(text);
          }}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.btnSignIn}>
        <Text style={styles.signInTxt}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: colors.bluePrimary,
    marginVertical: sizes.s30,
    fontSize: fontsizes.xLarge,
  },
  signInTxt: {
    ...Style.txt16_white,
    ...Style.txtCenter,
  },
  btnSignIn: {
    padding: sizes.s10,
    backgroundColor: colors.bluePrimary,
    marginVertical: sizes.s10 * 2,
    borderRadius: sizes.s10,
    shadowColor: colors.bluePrimary,
    shadowOffset: {
      width: 0,
      height: sizes.s10,
    },
    shadowOpacity: 0.3,
    shadowRadius: sizes.s10,
  },
});
