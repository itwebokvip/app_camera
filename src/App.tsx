import React from 'react';
import {StatusBar} from 'react-native';

import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

import {Device} from 'utils';
import {images} from 'assets';
import {Icon} from 'components';
import Navigation from './navigation';
import {Style, colors, sizes} from 'core';

export default function App() {
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[Style.toastStyle, {backgroundColor: '#C4F2DD'}]}
        contentContainerStyle={{padding: sizes.s12}}
        renderLeadingIcon={() => (
          <Icon
            source={images.ic_comment_check}
            size={sizes.s24}
            style={Style.top12}
          />
        )}
        renderTrailingIcon={() => (
          <Icon
            source={images.ic_close}
            size={sizes.s12}
            style={[Style.top4, Style.right4]}
          />
        )}
        onPress={() => Toast.hide()}
        text1Style={[Style.txt14, Style.bold, {color: colors.green900}]}
        text2Style={[Style.txt14, {color: colors.green900}]}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={[Style.toastStyle, {backgroundColor: '#FDE0DE'}]}
        contentContainerStyle={{padding: sizes.s12}}
        renderLeadingIcon={() => (
          <Icon
            source={images.ic_shield_exclamation}
            size={sizes.s24}
            style={Style.top12}
          />
        )}
        renderTrailingIcon={() => (
          <Icon
            source={images.ic_close}
            size={sizes.s12}
            style={[Style.top4, Style.right4]}
          />
        )}
        onPress={() => Toast.hide()}
        text1Style={[Style.txt14, Style.bold, {color: colors.error}]}
        text2Style={[Style.txt14, Style.bold, {color: colors.error}]}
      />
    ),
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        hidden={false}
        translucent={true}
      />
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
      <Toast config={toastConfig} topOffset={Device.getStatusBarHeight()} />
    </>
  );
}
