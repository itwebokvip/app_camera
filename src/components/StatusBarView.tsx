import React from 'react';
import {StatusBar, View} from 'react-native';
import Device from 'utils/Device';

interface Props {
  backgroundColor?: string;
  lightContent?: boolean;
}
const StatusBarView: React.FC<Props> = (props: Props) => {
  return (
    <View style={{zIndex: -1}}>
      <View
        style={{
          height: Device.getStatusBarHeight(),
          backgroundColor: props.backgroundColor,
        }}
      />
      <StatusBar
        barStyle={props?.lightContent ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        hidden={false}
        translucent={true}
      />
    </View>
  );
};

export default StatusBarView;
