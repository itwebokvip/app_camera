declare module 'react-native-settings';
declare module 'root-stack-params' {
  import {Program} from 'models';
  import {StackScreenProps} from '@react-navigation/stack';

  export type RootStackParamList = {
    auth: undefined;
    main: undefined;
  };

  export type AuthStackParamList = {
    welcome: undefined;
    login: undefined;
  };

  export type MainStackParamList = {
    home: undefined;
    createProgram: undefined;
    detailedProgram: {
      detailedProgram: Program;
    };
    editProgramImage: undefined;
    profileScreen: undefined;
  };

  export type CombinedStackParamList = RootStackParamList &
    AuthStackParamList &
    MainStackParamList;

  export type ScreenProps<Screen extends keyof CombinedStackParamList> =
    StackScreenProps<CombinedStackParamList, Screen>;
}
