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
import moment from 'moment';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../styles';
import {ImageInfoPayload} from 'models';
import {Style, colors, sizes} from 'core';
import ShowToast from 'helpers/ShowToast';
import {Button, Loading} from 'components';
import Permissions from 'utils/Permissions';
import {ScreenProps} from 'root-stack-params';
import {GOOGLE_MAP_API_KEY} from 'helpers/common';
import {getUTCTime, uploadMultiFiles, uploadMultiImageInfo} from 'service ';
import SubmitDate from 'common/submitDate';

const TodayPrograms: React.FC<ScreenProps<'detailedProgram'>> = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [addressImage, setAddressImage] = useState<LocationGG>();
  const [utcTime, setUtcTime] = useState<UTCTimeResponse>();
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
            const currentAddress =
              mapData.results[0].address_components[2].long_name +
              ',' +
              mapData.results[0].address_components[3].long_name +
              ',' +
              mapData.results[0].address_components[4].long_name;
            //console.log('Kết quả:', currentAddress);
            setAddressImage(mapData.results[0]);
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

  const onDeleteImg = (index: number) => {
    setData(oldData => oldData.filter((_, i) => i !== index));
  };

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Asset>) => {
      const {index, item} = info;
      return (
        <View key={index} style={styles.imageContainer}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: item.uri}}>
              <View style={Style.p8}>
                {utcTime && (
                  <Text style={styles.detailedImageTxt}>
                    {moment(utcTime.data.data).format('MMMM DD, YYYY hh:mm A')}
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
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => onDeleteImg(index)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={sizes.s30}
                  color={colors.error}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      );
    },
    [addressImage, utcTime],
  );

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  const onImagePickerResult = useCallback(
    (response: ImagePickerResponse) => {
      if (response?.assets) {
        let newData = [...data];
        newData = newData.concat(response?.assets);
        loadTimeImage();
        setData(newData);
      } else if (response.errorCode) {
        Alert.alert('Lưu ý', response.errorCode);
      } else if (response.errorMessage) {
        Alert.alert('Lưu ý', response.errorMessage);
      }
    },
    [data],
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
    if (data.length === 0) {
      return ShowToast('error', 'Lưu ý', 'Không có gì để gửi!');
    } else {
      try {
        Loading.show();
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
          const curAsset = data[i];
          formData.append('files', {
            uri: curAsset.uri,
            name: curAsset.fileName,
            type: curAsset.type,
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
          const imageInfoResponse = await uploadMultiImageInfo(payload);
          console.log('imageInfoResponse: >>>', imageInfoResponse);
        }

        ShowToast('success', 'Lưu ý', 'Gửi thành công!');
        const submittedTime = new Date();
        SubmitDate.getInstance().setSubmittedTime(submittedTime);
        setData([]);
      } catch (error) {
        console.log('Error:  ' + JSON.stringify(error));
        ShowToast('error', 'Lưu ý', 'Tải hình ảnh lên không thành công!');
      } finally {
        Loading.hide();
      }
    }
  }, [address, data, utcTime]);

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
