import {Style, colors, sizes} from 'core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import StatusBarView from './StatusBarView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {goScreen} from 'helpers/navigation';

interface Props {
  children: string;
}

export function DemoTitle({children}: Props) {
  return (
    <View style={styles.container}>
      <StatusBarView lightContent backgroundColor={colors.bluePrimary} />
      <View style={[Style.w100, Style.block_center]}>
        <Text style={styles.text}>{children}</Text>
        <TouchableOpacity
          style={{position: 'absolute', right: sizes.s20}}
          onPress={() => goScreen('createProgram')}>
          <MaterialCommunityIcons
            name="plus-box"
            size={sizes.s30}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.bluePrimary,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
