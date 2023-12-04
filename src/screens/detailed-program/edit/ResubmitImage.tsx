import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import moment from 'moment-timezone';
import {
  Asset,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import GetLocation from 'react-native-get-location';

import {Button, Loading} from 'components';

import styles from '../styles';
import {Style, sizes, colors} from 'core';
import ShowToast from 'helpers/ShowToast';
import {goBack} from 'helpers/navigation';
import Permissions from 'utils/Permissions';
import {getUTCTime, updateImageInfos} from 'service ';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';
import {GOOGLE_MAP_API_KEY, IMAGE_DOMAIN} from 'helpers/common';
import TodayPrograms from '../components/TodayPrograms';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Resubmit: React.FC<any> = ({params}: any) => {
  const [data, setData] = useState<Asset>();
  const [address, setAddress] = React.useState<any>(null);
  const [timeZone, setTimeZone] = useState<any>();
  const [utcTime, setUtcTime] = useState<UTCTimeResponse>();
  const [timeFormat, setTimeFormat] = useState<any>();
  const [addressImage, setAddressImage] = useState<LocationGG>();
  const viewShotRef = useRef<any>();

  const deviceUtcOffset = moment().utcOffset();

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
              mapData.results[0].address_components[2]?.long_name +
              ',' +
              mapData.results[0].address_components[3]?.long_name +
              ',' +
              mapData.results[0].address_components[4]?.long_name;
            getTimeZone(latitude, longitude);
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
  useEffect(() => {
    if (timeZone) Loading.hide();
  }, [timeZone]);
  console.log('cvxcv', timeZone);

  const getTimeZone = (latitude: number, longitude: number) => {
    const mapUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${
      Date.now() / 1000
    }&key=${GOOGLE_MAP_API_KEY}`;
    axios
      .get(mapUrl)
      .then(response => {
        const timeZones = response.data;
        setTimeZone(timeZones);
      })
      .catch((error: any) => {
        console.error('Lỗi khi gửi yêu cầu:', error);
        ShowToast('error', 'Thông báo', 'Lỗi lấy vị trí hiện tại!');
      });
  };

  const formatDateWithTimeZone = (
    dateTimeString: string,
    timeZoneId: string,
  ) => {
    console.log(`Day la ${dateTimeString}  +  ${timeZoneId}`);
    const formattedDateTime = moment(dateTimeString)
      .tz(timeZoneId)
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return formattedDateTime;
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
        console.log('cookl', response);

        setData(response?.assets[0]);
      } else if (response.errorCode) {
        Alert.alert('Notice', response.errorCode);
      } else if (response.errorMessage) {
        Alert.alert('Notice', response.errorMessage);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const loadTimeImage = async () => {
    const uploadResponse = await getUTCTime();
    const apiDateTime = moment.utc(uploadResponse.data.data);
    const localDateTime = apiDateTime.utcOffset(deviceUtcOffset);
    console.log('TIME API ' + JSON.stringify(uploadResponse));
    console.log('TIME COMPARE ZONE ' + JSON.stringify(localDateTime));
    const formattedDateTime = formatDateWithTimeZone(
      localDateTime.toString(),
      timeZone.timeZoneId,
    );
    console.log('FORMAT TIME:  ' + formattedDateTime);
    setUtcTime(uploadResponse.data);
    setTimeFormat(formattedDateTime);
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
    <>
      <TodayPrograms
        dataFromEdit={[data]}
        isEditing={true}
        getdata={setData}
        id={params.data.id}
      />
      {data == undefined && (
        <View style={Style.container}>
          <View style={Style.top20}>
            <View style={styles.imageContainer}>
              <View style={styles.container}>
                <ViewShot
                  ref={viewShotRef}
                  options={{format: 'png', quality: 0.8}}>
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
                        {timeFormat ? (
                          <Text style={styles.detailedImageTxt}>
                            {timeFormat}
                          </Text>
                        ) : (
                          <Text style={styles.detailedImageTxt}>
                            {formatDateWithTimeZone(
                              params?.data?.createdTime,
                              timeZone?.timeZoneId,
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
                    <TouchableOpacity
                      style={styles.btnDelete}
                      //onPress={() => onDeleteImg(index)}
                    >
                      <MaterialCommunityIcons
                        name="delete-circle"
                        size={sizes.s30}
                        color={colors.error}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </ViewShot>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Resubmit;
