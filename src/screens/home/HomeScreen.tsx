import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {DemoButton, DemoResponse, DemoTitle} from '../../components';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';
import {SignIn, UploadImage} from '../../service ';

const includeExtra = true;

export default function HomeScreen() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [response, setResponse] = React.useState<any>(null);
  const [locations, setLocation] = React.useState<Location | null>(null);
  const [address, setAddress] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<LocationErrorCode | null>(null);

  // const [forceLocation, setForceLocation] = React.useState(true);
  // const [highAccuracy, setHighAccuracy] = React.useState(true);
  // const [locationDialog, setLocationDialog] = React.useState(true);
  // const [significantChanges, setSignificantChanges] = React.useState(false);
  // const [observing, setObserving] = React.useState(false);
  // const [foregroundService, setForegroundService] = React.useState(false);
  // const [useLocationManager, setUseLocationManager] = React.useState(false);
  // const [location, setLocation] = React.useState<GeoPosition | null>(null);
  // https://maps.googleapis.com/maps/api/geocode/json?address=10.7599467,106.6828022&key=AIzaSyB7gB07dHR82m8K2wrknlDj0841xOaVSTU

  React.useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLoading(false);
        setLocation(newLocation);
        console.log('Location:  ' + JSON.stringify(newLocation));
        const mapUrl =
          'https://maps.googleapis.com/maps/api/geocode/json?address=10.7599467,106.6828022&key=AIzaSyB7gB07dHR82m8K2wrknlDj0841xOaVSTU';
        axios
          .get(mapUrl)
          .then(response => {
            // Lấy dữ liệu từ kết quả
            const data = response.data;
            console.log(
              'Kết quả:',
              JSON.stringify(data.results[0].formatted_address),
            );
            setAddress(data.results[0].formatted_address);
          })
          .catch(error => {
            console.error('Lỗi khi gửi yêu cầu:', error);
          });
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const {code, message} = ex;
          console.warn('catch: ' + code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
        setLoading(false);
        setLocation(null);
      });
  };

  const onButtonPress = React.useCallback(
    async (type: String, options: ImagePicker.CameraOptions) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    },
    [],
  );

  const submitOnImageLocation = async () => {
    console.log('Image:  ' + JSON.stringify(response));
    console.log('Location:  ' + address);

    try {
      const [result] = await Promise.all([
        UploadImage(
          response.assets[0].fileName,
          response.assets[0].fileSize,
          'Thành Phố HCM',
          moment(response.assets[0].timestamp).format('MMMM DD, YYYY hh:mm A'),
        ),
      ]);
      console.log('KetQua:  ' + JSON.stringify(result));
    } catch (error) {
      console.log('Error:  ' + JSON.stringify(error));
    }

    //requestLocation();
    // try {
    //   const [result] = await Promise.all([
    //     SignIn("Admin", "okvip@@"),
    //   ]);
    //   console.log('KetQua DangNhap:  ' + JSON.stringify(result));
    // } catch (error) {
    //   console.log('[ERROR] Loi:  ' + error);
    // }

    // const params = {
    //   "name": response.assets[0].fileName,
    //   "size": response.assets[0].fileSize,
    //   "location": address,
    //   "shootTime": moment(response.assets[0].timestamp).format(
    //     'MMMM DD, YYYY hh:mm A',
    //   ).toString,
    // };
    // const base_url = 'https://api-camera.okvip.dev/swagger/';
    // const content_base = 'api/imageInfos';
    // axios.post('https://api-camera.okvip.dev/api/imageInfos', params)
    //   .then(response => {
    //     // Lấy dữ liệu từ kết quả
    //     const data = response.data;
    //     console.log('Kết quả API:', JSON.stringify(data));
    //   })
    //   .catch(error => {
    //     console.error('Lỗi khi gửi yêu cầu:', error);
    //   });
  };

  // const hasPermissionIOS = async () => {
  //   const openSetting = () => {
  //     Linking.openSettings().catch(() => {
  //       Alert.alert('Unable to open settings');
  //     });
  //   };
  //   const status = await Geolocation.requestAuthorization('whenInUse');

  //   if (status === 'granted') {
  //     return true;
  //   }

  //   if (status === 'denied') {
  //     Alert.alert('Location permission denied');
  //   }

  //   if (status === 'disabled') {
  //     Alert.alert(
  //       `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
  //       '',
  //       [
  //         { text: 'Go to Settings', onPress: openSetting },
  //         { text: "Don't Use Location", onPress: () => { } },
  //       ],
  //     );
  //   }

  //   return false;
  // };

  // const hasLocationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     const hasPermission = await hasPermissionIOS();
  //     return hasPermission;
  //   }

  //   if (Platform.OS === 'android' && Platform.Version < 23) {
  //     return true;
  //   }

  //   const hasPermission = await PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );

  //   if (hasPermission) {
  //     return true;
  //   }

  //   const status = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );

  //   if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //     return true;
  //   }

  //   if (status === PermissionsAndroid.RESULTS.DENIED) {
  //     ToastAndroid.show(
  //       'Location permission denied by user.',
  //       ToastAndroid.LONG,
  //     );
  //   } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //     ToastAndroid.show(
  //       'Location permission revoked by user.',
  //       ToastAndroid.LONG,
  //     );
  //   }

  //   return false;
  // };

  // const getLocation = async () => {
  //   const hasPermission = await hasLocationPermission();

  //   if (!hasPermission) {
  //     return;
  //   }

  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocation(position);
  //       console.log("POSITION NHAN DUOC:  " + position);
  //       const mapUrl = 'https://google.com/maps/search/?api=1&query=10.7599455,106.6827714';

  //       // Gửi yêu cầu HTTP
  //       axios.get(mapUrl)
  //         .then(response => {
  //           // Lấy dữ liệu từ kết quả
  //           console.log('Kết quả:', response.data);
  //         })
  //         .catch(error => {
  //           console.error('Lỗi khi gửi yêu cầu:', error);
  //         });
  //     },
  //     error => {
  //       Alert.alert(`Code ${error.code}`, error.message);
  //       setLocation(null);
  //       console.log(error);
  //     },
  //     {
  //       accuracy: {
  //         android: 'high',
  //         ios: 'best',
  //       },
  //       enableHighAccuracy: highAccuracy,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //       distanceFilter: 0,
  //       forceRequestLocation: forceLocation,
  //       forceLocationManager: useLocationManager,
  //       showLocationDialog: locationDialog,
  //     },
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <DemoTitle>🌄 Desciption Image</DemoTitle>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}>
                {title}
              </DemoButton>
            );
          })}
        </View>
        <DemoResponse>{response}</DemoResponse>

        {response?.assets &&
          response?.assets.map(
            ({uri}: {uri: string}) => (
              console.log('THONG TIN BUC ANH:  ' + JSON.stringify(response)),
              (
                <View key={uri} style={styles.imageContainer}>
                  <View style={styles.container}>
                    <ImageBackground
                      resizeMode="cover"
                      resizeMethod="scale"
                      style={styles.image}
                      source={{uri: uri}}>
                      <View>
                        <Text style={{color: 'red', padding: 10}}>
                          {moment(response.assets.timestamp).format(
                            'MMMM DD, YYYY hh:mm A',
                          )}
                        </Text>
                        <Text style={{color: 'red', padding: 10}}>
                          LOCALTION
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              )
            ),
          )}
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              minWidth: '45%',
              maxWidth: '100%',
              marginHorizontal: 8,
              marginVertical: 4,
              borderRadius: 8,
              backgroundColor: 'red',
            }}
            onPress={submitOnImageLocation}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Submit Image
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 600,
      maxWidth: 800,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
      includeBase64: false,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}
