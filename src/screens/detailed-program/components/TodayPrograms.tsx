import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

const TodayPrograms: React.FC<any> = ({ route }: any) => {
  console.log('TodayProgram:: ' + JSON.stringify(route));




  return <View style={styles.container}></View>;
};

export default TodayPrograms;
