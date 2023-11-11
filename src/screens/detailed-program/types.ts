import {RouteProp} from '@react-navigation/native';

export type ProgramTabParamList = {
  today: undefined;
  history: undefined;
};

export type TabNavigationProp = RouteProp<
  ProgramTabParamList,
  keyof ProgramTabParamList
>;
