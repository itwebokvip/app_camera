import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {images} from 'assets';
import {Style, colors, fonts, fontsizes, screenHeight, sizes} from 'core';
import {goScreen} from 'helpers/navigation';

const WelcomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <ImageBackground
          style={{
            height: screenHeight / 4.0,
          }}
          resizeMode="contain"
          source={images.welcome_img}
        />
        <View
          style={{
            paddingTop: sizes.s40,
            paddingHorizontal: sizes.s20,
          }}>
          <Text style={styles.title}>Take Camera Description</Text>
          <Text style={[Style.txt14, Style.txtCenter]}>
            Explore all the existing job roles based or your interest and study
            major
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: sizes.s10 * 6,
            paddingHorizontal: sizes.s10 * 2,
          }}>
          <TouchableOpacity
            onPress={() => goScreen('login')}
            style={styles.btnContinue}>
            <Text style={styles.continueTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: fontsizes.xLarge,
    color: colors.bluePrimary,
    fontFamily: fonts.bold,
    marginVertical: sizes.s30,
    textAlign: 'center',
  },
  btnContinue: {
    flex: 1,
    backgroundColor: colors.bluePrimary,
    paddingVertical: sizes.s10,
    borderRadius: sizes.s10,
    shadowColor: colors.bluePrimary,
    shadowOffset: {
      width: 0,
      height: sizes.s10,
    },
    shadowOpacity: 0.3,
    shadowRadius: sizes.s10,
    justifyContent: 'center',
  },
  continueTxt: {
    ...Style.txt16_white,
    ...Style.txtCenter,
  },
});
