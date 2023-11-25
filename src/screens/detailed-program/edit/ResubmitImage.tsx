import React, {useCallback, useRef, useState} from 'react';
import {Alert, Text, View, ImageBackground} from 'react-native';

import axios from 'axios';
import moment from 'moment';
import {
  Asset,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import GetLocation from 'react-native-get-location';

import {Button, Loading} from 'components';

import styles from '../styles';
import {Style, sizes} from 'core';
import ShowToast from 'helpers/ShowToast';
import {goBack} from 'helpers/navigation';
import Permissions from 'utils/Permissions';
import {getUTCTime, updateImageInfos} from 'service ';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';
import {GOOGLE_MAP_API_KEY, IMAGE_DOMAIN} from 'helpers/common';

const Resubmit: React.FC<any> = ({params}: any) => {
  const [data, setData] = useState<Asset>();
  const [address, setAddress] = React.useState<any>(null);
  const [utcTime, setUtcTime] = useState<UTCTimeResponse>();
  const [addressImage, setAddressImage] = useState<LocationGG>();
  const viewShotRef = useRef<any>();

  const requestLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Quyền vị trí',
        message: 'Ứng dụng cần có quyền để yêu cầu vị trí của bạn.',
        buttonPositive: 'Ok',
      },
    })
      .then(coordinates => {
        const longitude = coordinates.longitude;
        const latitude = coordinates.latitude;
        const mapUrl =
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          GOOGLE_MAP_API_KEY;
        axios
          .get(mapUrl)
          .then(response => {
            const mapData = response.data;
            const currentAddress =
              mapData.results[0].address_components[2].long_name +
              ',' +
              mapData.results[0].address_components[3].long_name +
              ',' +
              mapData.results[0].address_components[4].long_name;
            setAddressImage(mapData.results[0]);
            setAddress(currentAddress);
          })
          .catch((error: any) => {
            console.error('Lỗi khi gửi yêu cầu:', error);
            ShowToast('error', 'Thông báo', 'Lỗi lấy vị trí hiện tại!');
          });
      })
      .catch((error: any) => {
        console.error('Lỗi khi gửi yêu cầu:', error);
        ShowToast('error', 'Thông báo', 'Lỗi lấy vị trí hiện tại!');
      });
  };

  const uploadImage = async (uri?: string) => {
    const base_url: string = 'https://api-camera.okvip.dev/api/files/upload';
    const formData: FormData = new FormData();
    if (uri) {
      formData.append('files', {
        uri,
        name: `${Date.now()}.png`,
        type: 'image/jpg',
      });

      const token = await KeychainManager.getItem(STORAGE_KEYS.token);

      try {
        const res = await fetch(base_url, {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res?.status === 200) {
          const result = await res.json();
          return result?.data[0]?.url;
        }
      } catch (error) {
        console.log('Networking Failed!', error);
      }
    }
  };

  const onImagePickerResult = useCallback(
    async (response: ImagePickerResponse) => {
      if (response?.assets) {
        await loadTimeImage();
        requestLocation();
        setData(response?.assets[0]);
      } else if (response.errorCode) {
        Alert.alert('Notice', response.errorCode);
      } else if (response.errorMessage) {
        Alert.alert('Notice', response.errorMessage);
      }
    },
    [],
  );

  const loadTimeImage = async () => {
    const uploadResponse = await getUTCTime();
    setUtcTime(uploadResponse.data);
  };

  const onTakeImage = useCallback(() => {
    Permissions.camera(() => {
      launchCamera(
        {
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 600,
          maxWidth: 800,
        },
        onImagePickerResult,
      );
    });
  }, [onImagePickerResult]);

  const onSubmit = useCallback(async () => {
    try {
      Loading.show();
      if (data == null) {
        ShowToast('error', 'Thông báo', 'Không gì thay đổi!');
      } else {
        const uri = await viewShotRef.current.capture();
        const image = await uploadImage(uri);
        await Promise.all([
          updateImageInfos(
            data.fileSize!,
            address,
            image,
            moment(utcTime?.data.data).format('MMMM DD, YYYY hh:mm A'),
            params.data.id,
          ),
        ]);
        ShowToast('success', 'Thông báo', 'Tải ảnh thành công!');
        goBack();
      }
    } catch (error) {
      console.log('Error:  ' + JSON.stringify(error));
      ShowToast('error', 'Thông báo', 'Tải ảnh thất bại!');
    } finally {
      Loading.hide();
    }
  }, [address, data, params.data.id, utcTime?.data.data]);

  const parts = params?.data.location
    .split(',')
    .map((part: any) => part.trim());
  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <Button title="Thay đổi Hình Ảnh" onPress={onTakeImage} />
        <View style={{height: sizes.s10}} />
        <Button type="bluePrimary" title="Submit" onPress={onSubmit} />

        <View style={styles.imageContainer}>
          <View style={styles.container}>
            <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.8}}>
              <ImageBackground
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{
                  uri: data
                    ? data.uri
                    : IMAGE_DOMAIN + '/' + params?.data?.path,
                }}>
                {data && (
                  <View style={Style.p8}>
                    {utcTime ? (
                      <Text style={styles.detailedImageTxt}>
                        {moment(utcTime.data.data).format(
                          'MMMM DD, YYYY hh:mm A',
                        )}
                      </Text>
                    ) : (
                      <Text style={styles.detailedImageTxt}>
                        {moment(params?.data?.createdTime).format(
                          'MMMM DD, YYYY hh:mm A',
                        )}
                      </Text>
                    )}
                    {addressImage ? (
                      <Text style={styles.detailedImageTxt}>
                        {addressImage?.address_components[2].long_name}
                        {'\n'}
                        {'\n'}
                        {addressImage?.address_components[3].long_name}
                        {'\n'}
                        {addressImage?.address_components[4].long_name}
                      </Text>
                    ) : (
                      <Text style={styles.detailedImageTxt}>
                        {parts[0]}
                        {'\n'}
                        {'\n'}
                        {parts[1]}
                        {'\n'}
                        {parts[2]}
                      </Text>
                    )}
                  </View>
                )}
              </ImageBackground>
            </ViewShot>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Resubmit;
