import {colors, sizes} from 'core';
import * as React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import StatusBarView from './StatusBarView';

interface Props {
  children: string;
}

export function DemoTitle({children}: Props) {
  return (
    <View style={styles.container}>
      <StatusBarView lightContent backgroundColor={colors.bluePrimary} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes.s10,
    backgroundColor: 'steelblue',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
