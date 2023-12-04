import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Loading, AppTextInput} from 'components';

import {SignUp} from '../../service ';
import ShowToast from 'helpers/ShowToast';
import {goBack} from 'helpers/navigation';
import {Style, colors, fonts, fontsizes, sizes} from 'core';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validationForm = useCallback(() => {
    if (username.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập tên đăng nhập!');
      return false;
    }
    if (email.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập email!');
      return false;
    }

    if (!email.match(EMAIL_REGEX)) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập email hợp lệ!');
      return false;
    }

    if (fullname.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập họ và tên!');
      return false;
    }

    if (phoneNumber.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập số điện thoại!');
      return false;
    }

    if (password.length === 0) {
      ShowToast('error', 'Thông báo', 'Xin hãy nhập mật khẩu!');
      return false;
    }

    return true;
  }, [
    username.length,
    email,
    fullname.length,
    phoneNumber.length,
    password.length,
  ]);

  const handleRegister = useCallback(async () => {
    try {
      const isValid = validationForm();
      if (!isValid) return;

      Loading.show();
      const [result] = await Promise.all([
        SignUp({username, email, fullname, phoneNumber, password}),
      ]);

      if (result.success === true) {
        ShowToast('success', 'Chúc mừng', 'Đã tạo tài khoản thành công!');

        setUsername('');
        setEmail('');
        setFullname('');
        setPhoneNumber('');
        setPassword('');

        setTimeout(() => {
          goBack();
        }, 1000);
      } else {
        ShowToast('error', 'Notice', result.errors);
      }
    } catch (error) {
      ShowToast('error', 'Notice', 'Something went wrong!');
    } finally {
      Loading.hide();
    }
  }, [validationForm, username, email, fullname, phoneNumber, password]);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, styles.containerCenter]}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{width: 300, height: 100, marginVertical: sizes.s20}}
          source={require('../../assets/images/OKVIP-LOGO-VECTOR-02.png')}
          resizeMode="cover"
          resizeMethod="scale"
        />
      </View>
      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: colors.semanticsWarning,
          borderRadius: sizes.s30,
          elevation: 2,
        }}>
        <Text style={styles.title}>Đăng ký</Text>
        <View style={Style.pv10}>
          <AppTextInput
            autoCapitalize="none"
            placeholder="Tên đăng nhập"
            onChangeText={setUsername}
          />
          <AppTextInput
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={setEmail}
          />
          <AppTextInput
            autoCapitalize="none"
            placeholder="Họ và tên"
            onChangeText={setFullname}
          />
          <AppTextInput
            autoCapitalize="none"
            placeholder="Số điện thoại"
            onChangeText={setPhoneNumber}
            keyboardType="number-pad"
          />
          <AppTextInput
            placeholder="Mật khẩu"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.btnSignIn}>
          <Text style={styles.signInTxt}>Hoàn thành</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goBack()} style={styles.btnSignUp}>
          <Text style={styles.signUpTxt}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

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
  signUpTxt: {
    ...Style.txt16_black_bold,
    ...Style.txtCenter,
  },
  btnSignIn: {
    padding: sizes.s10,
    backgroundColor: colors.bluePrimary,
    marginVertical: sizes.s10,
    borderRadius: sizes.s10,
    shadowColor: colors.bluePrimary,
    shadowOffset: {
      width: 0,
      height: sizes.s10,
    },
    shadowOpacity: 0.3,
    shadowRadius: sizes.s10,
  },
  btnSignUp: {
    padding: sizes.s10,
    backgroundColor: '#f9e82e',
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
