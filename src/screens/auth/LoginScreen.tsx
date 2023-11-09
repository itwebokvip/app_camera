import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SignIn } from '../../service ';

import { goReset } from 'helpers/navigation';
import AppTextInput from 'components/AppTextInput';
import { Style, colors, fonts, fontsizes, sizes } from 'core';
import { Loading } from 'components';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validationForm = useCallback(() => { }, []);

  const handleLogin = async () => {
    try {
      Loading.show();
      const [result] = await Promise.all([SignIn(email, password)]);
      console.log('KetQua DangNhap:  ' + JSON.stringify(result.Success));
      if (result.Success === true) {
        goReset('main');
      }
    } catch (error) {
      console.log('[ERROR] Loi:  ' + error);
    } finally {
      Loading.hide();
    }
  };

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
