/* eslint-disable no-catch-shadow */
import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {DemoButton, DemoResponse, DemoTitle, Loading} from 'components';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';
import {ParseImageToUrl, UploadImage} from '../../service ';
import ShowToast from 'helpers/ShowToast';
import Permissions from 'utils/Permissions';
import {Style} from 'core';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';

export default function TakeImageScreen() {
  const [response, setResponse] = React.useState<any>(null);
  const [locations, setLocation] = React.useState<Location | null>(null);
  const [address, setAddress] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<LocationErrorCode | null>(null);

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
        const longitude = newLocation.longitude;
        const latitude = newLocation.latitude;
        const mapUrl =
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=AIzaSyA21JwqECJSJuIoHQ4nDZEaKI8Ol9KoDbg';
        axios
          .get(mapUrl)
          .then(response => {
            const data = response.data;
            console.log('data: >>>', data);
            const currentAddress =
              data.results[0].address_components[2].long_name +
              ',' +
              data.results[0].address_components[3].long_name +
              ',' +
              data.results[0].address_components[4].long_name;
            console.log('Kết quả:', currentAddress);
            setAddress(currentAddress);
          })
          .catch(error => {
            console.error('Lỗi khi gửi yêu cầu:', error);
            ShowToast('error', 'Notice', 'Error get location current!');
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
        ShowToast('error', 'Notice', 'Error get location current!');
      });
  };

  const onButtonPress = React.useCallback(
    async (type: String, options: ImagePicker.CameraOptions) => {
      if (type === 'capture') {
        Permissions.camera(() => {
          ImagePicker.launchCamera(options, setResponse);
        });
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }
    },
    [],
  );

  const uploadImage = async (): Promise<void> => {
    const base_url: string = 'https://api-camera.okvip.dev/api/files/upload';
    const data: FormData = new FormData();
    data.append('file', {
      uri: response.assets[0].uri,
      name: response.assets[0].fileName,
      type: 'image/jpg',
    });
    const token = await KeychainManager.getItem(STORAGE_KEYS.token);

    try {
      const res = await fetch(base_url, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}  `,
        },
      });

      const result = await res.json();

      if (result?.status === 200) {
        return result?.data.url;
      }
      console.log('Ket quả trả về ' + JSON.stringify(result));
      return undefined;
    } catch (error) {
      console.log('Networking Failed!', error);
      return undefined;
    } finally {
      console.log('finally Failed!', error);
    }
  };

  const submitOnImageLocation = async () => {
    try {
      Loading.show();
      const image = await uploadImage();
      console.log('Image:  ' + image);
      if (image == null || address == null) {
        ShowToast(
          'error',
          'Notice',
          'Can not upload Image Because of Invalid Param!',
        );
      } else {
        await Promise.all([
          UploadImage(
            response.assets[0].fileSize,
            address,
            image,
            moment(response.assets[0].timestamp).format(
              'MMMM DD, YYYY hh:mm A',
            ),
          ),
        ]);
        ShowToast('success', 'Notice', 'Upload Image Successful');
      }
    } catch (error) {
      console.log('Error:  ' + JSON.stringify(error));
      ShowToast('error', 'Notice', 'Upload Image Failed!');
    } finally {
      Loading.hide();
    }
  };

  return (
    <View style={styles.container}>
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
        {/* <DemoResponse>{response}</DemoResponse> */}

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
                        <Text
                          style={{
                            color: 'red',
                            padding: 10,
                            fontWeight: '600',
                          }}>
                          {moment(response.assets.timestamp).format(
                            'MMMM DD, YYYY hh:mm A',
                          )}
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            padding: 10,
                            fontWeight: '600',
                          }}>
                          {address ? address : 'Location'}
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
    </View>
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
  // {
  //   title: 'Select Image',
  //   type: 'library',
  //   options: {
  //     selectionLimit: 0,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   },
  // },
];
