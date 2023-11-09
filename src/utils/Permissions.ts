import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import RNSettings from 'react-native-settings';
import Device from './Device';
import {LogUtils} from 'helpers/log';

class Permissions {
  async camera(callback?: () => void) {
    if (Device.isIos) {
      request(PERMISSIONS.IOS.CAMERA).then(result => {
        if (result === RESULTS.GRANTED) {
          callback && callback();
        } else {
          Alert.alert(
            'Notice',
            'Please accept application for camera to continue',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  openSettings();
                },
              },
            ],
          );
        }
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callback && callback();
        } else {
          Alert.alert(
            'Notice',
            'Please accept application for camera to continue',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  openSettings();
                },
              },
            ],
          );
        }
      } catch (err) {}
    }
  }

  photoLibrary(callback?: () => void) {
    if (Device.isIos) {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        if (result === RESULTS.GRANTED) {
          callback && callback();
        } else {
          Alert.alert(
            'Notice',
            'Please accept application for photo library to continue',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  openSettings();
                },
              },
            ],
          );
        }
      });
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ).then(result => {
          if (result === PermissionsAndroid.RESULTS.GRANTED) {
            callback && callback();
          } else {
            Alert.alert(
              'Notice',
              'Please accept application for photo library to continue',
              [
                {text: 'Cancel'},
                {
                  text: 'OK',
                  onPress: () => {
                    openSettings();
                  },
                },
              ],
            );
          }
        });
      } catch (err) {}
    }
  }

  async microphone(callback?: () => void) {
    if (Device.isIos) {
      request(PERMISSIONS.IOS.MICROPHONE).then(result => {
        if (result === RESULTS.GRANTED) {
          callback && callback();
        } else {
          Alert.alert(
            'Notice',
            'Please accept application for microphone to continue',
            [
              {text: 'Cancel'},
              {
                text: 'OK',
                onPress: () => {
                  openSettings();
                },
              },
            ],
          );
        }
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callback && callback();
        }
      } catch (err) {}
    }
  }

  async requestNotification() {
    try {
      const granted = await requestNotifications(['alert', 'sound']);
      LogUtils.log(granted, 'granted notification');
    } catch (err) {
      console.log(err, Platform.OS);
    }
  }

  getCurrentLatLong = async (callback?: (data: GeoPosition) => void) => {
    if (Device.isIos) {
      const permission = await Geolocation.requestAuthorization('always');
      // LogUtil.i(permission, 'PERMISSION LOCATION CURRENT');
      if (permission === 'granted') {
        Geolocation.getCurrentPosition(
          positions => {
            callback?.(positions);
          },
          (error: any) => {
            Alert.alert('Error', 'Please allow app for location in setting', [
              {text: 'Cancel'},
              {
                text: 'Turn on',
                onPress: () => Linking.openSettings(), //open app setting
              },
            ]);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      } else {
        Alert.alert('Error', 'Please turn on location service', [
          {text: 'Cancel'},
          {
            text: 'Turn on',
            onPress: () => Linking.openURL('App-Prefs:Privacy&path=LOCATION'), //open location service on ios
          },
        ]);
      }
    }
    //Android
    else {
      requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]).then(statuses => {
        if (
          statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !== 'granted' &&
          statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] !== 'granted'
        ) {
          Alert.alert('Error', 'Please allow app for location in setting', [
            {text: 'Cancel'},
            {
              text: 'Turn on',
              onPress: () => Linking.openSettings(), //open app setting
            },
          ]);
        } else {
          Geolocation.getCurrentPosition(
            positions => {
              callback?.(positions);
            },
            (error: any) => {
              Alert.alert('Error', 'Please turn on location', [
                {text: 'Cancel'},
                {
                  text: 'Turn on',
                  onPress: () =>
                    RNSettings.openSetting(
                      RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                    ),
                },
              ]);
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    }
  };
}
export default new Permissions();
