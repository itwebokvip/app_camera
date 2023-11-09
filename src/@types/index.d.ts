declare module 'react-native-settings';
declare module 'root-stack-params' {
  export type RootStackParamList = {
    loading: undefined;
    auth: undefined;
    main: undefined;
  };

  export type AuthStackParamList = {
    welcome: undefined;
    login: undefined;
  };

  export type MainStackParamList = {
    home: undefined;
  };
}
