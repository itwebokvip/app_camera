import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View, ImageBackground } from 'react-native';
import styles from '../styles';
import { updateImageInfos } from 'service ';
import ShowToast from 'helpers/ShowToast';

import moment from 'moment';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import Permissions from 'utils/Permissions';
import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';

import { Button, Loading } from 'components';
import { Style, sizes } from 'core';
import { goBack } from 'helpers/navigation';
import { GOOGLE_MAP_API_KEY, IMAGE_DOMAIN } from 'helpers/common';
import GetLocation from 'react-native-get-location';
import axios from 'axios';

const Resubmit: React.FC<any> = ({ params }: any) => {
  const [data, setData] = useState<Asset>();

  const [address, setAddress] = React.useState<any>(null);

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
        //console.log('coordinates:  ' + JSON.stringify(coordinates));
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
            //console.log('mapData: >>>', mapData);
            const currentAddress =
              mapData.results[0].address_components[2].long_name +
              ',' +
              mapData.results[0].address_components[3].long_name +
              ',' +
              mapData.results[0].address_components[4].long_name;
            //console.log('Kết quả:', currentAddress);
            setAddress(currentAddress);
          })
          .catch((error: any) => {
            console.error('Lỗi khi gửi yêu cầu:', error);
            ShowToast('error', 'Lưu ý', 'Lỗi lấy vị trí hiện tại!');
          });
      })
      .catch((error: any) => {
        console.error('Lỗi khi gửi yêu cầu:', error);
        ShowToast('error', 'Lưu ý', 'Lỗi lấy vị trí hiện tại!');
      });
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const uploadImage = async (imageAssert?: Asset) => {
    const base_url: string = 'https://api-camera.okvip.dev/api/files/upload';
    const formData: FormData = new FormData();
    console.log('JSON Nhan Duoc:  ' + JSON.stringify(imageAssert));
    if (imageAssert) {
      formData.append('files', {
        uri: imageAssert.uri,
        name: imageAssert.fileName,
        type: 'image/jpg',
      });

      console.log('TEST:  ' + JSON.stringify(formData));
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

  const onImagePickerResult = useCallback((response: ImagePickerResponse) => {
    if (response?.assets) {
      setData(response?.assets[0]);
    } else if (response.errorCode) {
      Alert.alert('Notice', response.errorCode);
    } else if (response.errorMessage) {
      Alert.alert('Notice', response.errorMessage);
    }
  }, []);

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
    if (params.name.length === 0) {
      return ShowToast('error', 'Lưu ý', 'Vui lòng nhập thông tin!');
    } else {
      try {
        Loading.show();
        const image = await uploadImage(data);
        if (data == null) {
          ShowToast('error', 'Lưu ý', 'Không gì thay đổi!');
        } else {
          await Promise.all([
            updateImageInfos(
              data.fileSize!,
              address,
              image,
              params.programId,
              moment(data.timestamp).format('MMMM DD, YYYY hh:mm A'),
              params.data.id,
            ),
          ]);
          ShowToast('success', 'Lưu ý', 'Tải ảnh thành công!');
          goBack();
        }
      } catch (error) {
        console.log('Error:  ' + JSON.stringify(error));
        ShowToast('error', 'Lưu ý', 'Tải ảnh thất bại!');
      } finally {
        Loading.hide();
      }
    }
  }, [address, data, params.data.id, params.name.length, params.programId]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <Button title="Thay đổi Hình Ảnh" onPress={onTakeImage} />
        <View style={{ height: sizes.s10 }} />
        <Button type="bluePrimary" title="Submit" onPress={onSubmit} />

        <View style={styles.imageContainer}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{
                uri: data ? data.uri : IMAGE_DOMAIN + '/' + params?.data?.path,
              }}>
              <View>
                <Text style={styles.detailedImageTxt}>
                  {moment(params?.data.timestamp).format(
                    'MMMM DD, YYYY hh:mm A',
                  )}
                </Text>
                {params?.data.location && (
                  <Text style={styles.detailedImageTxt}>
                    {data ? address : params?.data.location}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Resubmit;
