import React, { useCallback, useContext, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Loading, AppTextInput } from 'components';

import { SignIn } from '../../service ';
import ShowToast from 'helpers/ShowToast';
import { goReset } from 'helpers/navigation';
import { Style, colors, fonts, fontsizes, sizes } from 'core';
import { UserContext } from 'contexts';

const LoginScreen: React.FC = () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validationForm = useCallback(() => {
    if (username.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập tên đăng nhập!');
      return false;
    }

    if (password.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập mật khẩu!');
      return false;
    }

    return true;
  }, [username, password.length]);

  const handleLogin = useCallback(async () => {
    try {
      const isValid = validationForm();
      if (!isValid) return;

      Loading.show();
      const [result] = await Promise.all([SignIn(username, password)]);

      if (result.Success === true) {
        goReset('main');
        result?.data && loginUser(result?.data);
      } else {
        ShowToast('error', 'Notice', result.errors);
      }
    } catch (error) {
      ShowToast('error', 'Notice', 'Something went wrong!');
    } finally {
      Loading.hide();
    }
  }, [validationForm, username, password, loginUser]);

  return (
    <View style={[styles.container, styles.containerCenter]}>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground style={{ width: 300, height: 100, marginVertical: sizes.s20 }} source={require('../../assets/images/OKVIP-LOGO-VECTOR-02.png')} resizeMode="cover"
          resizeMethod="scale" />
      </View>
      <View style={{
        padding: 20, justifyContent: 'center', backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: colors.semanticsWarning,
        borderRadius: sizes.s30,
        elevation: 2,
      }}>
        <Text style={styles.title}>Đăng nhập</Text>
        <View style={Style.pv36}>
          <AppTextInput
            autoCapitalize="none"
            placeholder="Tên đăng nhập"
            onChangeText={setUsername}
          />
          <AppTextInput
            placeholder="Mật khẩu"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.btnSignIn}>
          <Text style={styles.signInTxt}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.s20,
    backgroundColor: colors.black,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: colors.bluePrimary,
    marginVertical: sizes.s10,
    fontSize: fontsizes.xLarge,
    marginTop: sizes.s20,
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
  containerCenter: {
    justifyContent: 'center',
  },
});
