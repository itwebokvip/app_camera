import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import GetLocation from 'react-native-get-location';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';
import {ImageInfoPayload} from 'models';
import {Style, colors, sizes} from 'core';
import ShowToast from 'helpers/ShowToast';
import {Button, Loading} from 'components';
import SubmitDate from 'common/submitDate';
import Permissions from 'utils/Permissions';
import {ScreenProps} from 'root-stack-params';
import {GOOGLE_MAP_API_KEY, Sleep} from 'helpers/common';
import {getUTCTime, uploadMultiFiles, uploadMultiImageInfo} from 'service ';

const TodayPrograms: React.FC<ScreenProps<'detailedProgram'>> = () => {
  const [data, setData] = useState<Asset[]>([]);

  const [refsArray, setRefsArray] = useState<any>([]);
  const [address, setAddress] = React.useState<any>(null);
  const [timeZone, setTimeZone] = React.useState<any>();
  const [utcTime, setUtcTime] = useState<UTCTimeResponse>();
  const [timeFormat, setTimeFormat] = useState<any>();
  const [addressImage, setAddressImage] = useState<LocationGG>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const deviceUtcOffset = moment().utcOffset();

  useEffect(() => {
    setRefsArray(data.map(() => React.createRef<any>()));
  }, [data]);

  const requestLocation = async () => {
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
          .then(async response => {
            const mapData = response.data;
            const currentAddress =
              mapData.results[0].address_components[2].long_name +
              ',' +
              mapData.results[0].address_components[3].long_name +
              ',' +
              mapData.results[0].address_components[4].long_name;
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
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('LAY GIA TRI: ' + timeZone);
  }, [timeZone]);

  const getTimeZone = (latitude: number, longitude: number) => {
    console.log(`THONG TIN ${latitude} VÀ ${longitude}`);
    const mapUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${
      Date.now() / 1000
    }&key=${GOOGLE_MAP_API_KEY}`;
    axios
      .get(mapUrl)
      .then(response => {
        const responseData = response.data;
        const dataZone = responseData.timeZoneId as any;
        setTimeZone(dataZone);
      })
      .catch((error: any) => {
        console.error('Lỗi khi gửi yêu cầu:', error);
        ShowToast('error', 'Thông báo', 'Lỗi lấy vị trí hiện tại!');
      });
  };

  const onDeleteImg = (index: number) => {
    setData(oldData => oldData.filter((_, i) => i !== index));
  };

  const formatDateWithTimeZone = useCallback(
    async (dateTimeString: string, timeZoneId: string) => {
      console.log(`TIME:  ${dateTimeString}  TIMEZONE:  ${timeZoneId}`);
      if (timeZoneId == null) {
        return utcTime;
      } else {
        const formattedDateTime = moment(dateTimeString)
          .tz(timeZoneId)
          .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        return formattedDateTime;
      }
    },
    [utcTime],
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Asset>) => {
      const {index, item} = info;
      return (
        <View key={index} style={styles.imageContainer}>
          <View style={styles.container}>
            <ViewShot
              ref={refsArray[index]}
              options={{format: 'png', quality: 0.8}}>
              <ImageBackground
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: item.uri}}>
                <View style={Style.p8}>
                  {timeFormat != null ? (
                    <Text style={styles.detailedImageTxt}>{timeFormat}</Text>
                  ) : (
                    <Text style={styles.detailedImageTxt}>
                      {utcTime?.data.data}
                    </Text>
                  )}
                  {addressImage && (
                    <Text style={styles.detailedImageTxt}>
                      {addressImage?.address_components[2].long_name}
                      {'\n'}
                      {'\n'}
                      {addressImage?.address_components[3].long_name}
                      {'\n'}
                      {addressImage?.address_components[4].long_name}
                    </Text>
                  )}
                </View>
                {!isSubmitted && (
                  <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={() => onDeleteImg(index)}>
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={sizes.s30}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                )}
              </ImageBackground>
            </ViewShot>
          </View>
        </View>
      );
    },
    [refsArray, timeFormat, utcTime?.data.data, addressImage, isSubmitted],
  );

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  const loadTimeImage = useCallback(async () => {
    try {
      console.log(
        'BEFORE loadTimeImage - TIMEZONE: ' + JSON.stringify(timeZone),
      );
      if (timeZone == null) {
        Alert.alert('Thông báo', 'Sự cố trên hình ảnh của bạn!');
      } else {
        const uploadResponse = await getUTCTime();
        const apiDateTime = moment.utc(uploadResponse.data.data);
        const localDateTime = apiDateTime.utcOffset(deviceUtcOffset);
        const formattedDateTime = await formatDateWithTimeZone(
          localDateTime.toString(),
          timeZone,
        );
        console.log(formattedDateTime);
        setUtcTime(uploadResponse.data);
        setTimeFormat(formattedDateTime);
      }
    } catch (error) {
      console.log('ERROR:  ' + error);
    }
  }, [deviceUtcOffset, formatDateWithTimeZone, timeZone]);

  const onImagePickerResult = useCallback(
    async (response: ImagePickerResponse) => {
      if (response?.assets) {
        await loadTimeImage();
        let newData = [...data];
        newData = newData.concat(response?.assets);
        setData(newData);
      } else if (response.errorCode) {
        Alert.alert('Thông báo', response.errorCode);
      } else if (response.errorMessage) {
        Alert.alert('Thông báo', response.errorMessage);
      }
    },
    [data, loadTimeImage],
  );

  const onTakeImage = useCallback(() => {
    Permissions.camera(() => {
      launchCamera(
        {
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
    if (data.length === 0) {
      return ShowToast('error', 'Thông báo', 'Không có gì để gửi!');
    } else {
      try {
        Loading.show();

        setIsSubmitted(true);
        await Sleep(1);
        const uriArr: string[] = [];
        for (let i = 0; i < refsArray.length; i++) {
          const ref = refsArray[i];
          const uri = await ref.current.capture();
          uriArr.push(uri);
          CameraRoll.save(uri, {
            type: 'photo',
          });
        }

        const formData = new FormData();
        for (let i = 0; i < uriArr.length; i++) {
          const curUri = uriArr[i];
          formData.append('files', {
            uri: curUri,
            name: `${Date.now()}_${i}.png`,
            type: 'image/png',
          });
        }

        const uploadResponse = await uploadMultiFiles(formData);
        const payload: ImageInfoPayload[] = [];
        for (let i = 0; i < uploadResponse.data.length; i++) {
          const curUploadImage = uploadResponse.data[i];
          payload.push({
            location: address,
            size: curUploadImage.fileSizeInBytes,
            path: curUploadImage.url,
            shootTime: moment(utcTime?.data.data).format(
              'MMMM DD, YYYY hh:mm A',
            ),
          });
        }
        const imageInfoResponse = await uploadMultiImageInfo(payload);

        if (!imageInfoResponse.success) {
          ShowToast('error', 'Thông báo', imageInfoResponse.error);
        } else {
          ShowToast('success', 'Thông báo', 'Gửi thành công!');
          setData([]);
          setRefsArray([]);
        }
        const submittedTime = new Date();
        SubmitDate.getInstance().setSubmittedTime(submittedTime);
      } catch (error) {
        console.log('Error:  ' + JSON.stringify(error));
        ShowToast('error', 'Thông báo', 'Tải hình ảnh lên không thành công!');
      } finally {
        Loading.hide();
        setIsSubmitted(false);
      }
    }
  }, [address, data, refsArray, utcTime?.data.data]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <Button title="Chụp ảnh" onPress={onTakeImage} />
        <View style={{height: sizes.s10}} />
        <Button type="bluePrimary" title="Gửi" onPress={onSubmit} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default TodayPrograms;
