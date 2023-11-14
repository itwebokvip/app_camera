import {RouteProp} from '@react-navigation/native';
import {Program} from 'models';

export type ProgramTabParamList = {
  today: {
    detailedProgram: Program;
  };
  history: {
    detailedProgram: Program;
  };
};

export type TabNavigationProp = RouteProp<
  ProgramTabParamList,
  keyof ProgramTabParamList
>;
