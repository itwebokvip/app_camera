import {
  AuthStackParamList,
  MainStackParamList,
  RootStackParamList,
} from 'root-stack-params';
import {CommonActions, NavigationContainerRef} from '@react-navigation/native';

let _navigator: NavigationContainerRef<ReactNavigation.RootParamList> | null =
  null;

function goBack() {
  if (_navigator?.canGoBack()) {
    if (_navigator && _navigator.dispatch) {
      _navigator.dispatch(CommonActions.goBack());
    }
  }
}

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function goReset(
  name: keyof RootStackParamList | keyof AuthStackParamList,
  params = {},
) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
}

function goResetAndNavigation(
  routeNames: {name: keyof RootStackParamList; params?: {}}[],
  activeIndex: number = 0,
) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.reset({
        index: activeIndex,
        routes: routeNames,
      }),
    );
  }
}

function goScreen(
  name:
    | keyof RootStackParamList
    | keyof AuthStackParamList
    | keyof MainStackParamList,
  params = {},
) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

export {goBack, goReset, goScreen, setTopLevelNavigator, goResetAndNavigation};
