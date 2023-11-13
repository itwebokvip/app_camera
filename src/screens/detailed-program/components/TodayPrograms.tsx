import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';
import { getProgrammesWithID, uploadMultiImageInfo } from 'service ';
import ShowToast from 'helpers/ShowToast';

import axios from 'axios';
import moment from 'moment';
import GetLocation from 'react-native-get-location';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Permissions from 'utils/Permissions';
import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';
import { UploadImage } from 'service ';

import { Button, Loading } from 'components';
import { Style, colors, sizes } from 'core';
import { GOOGLE_MAP_API_KEY } from 'helpers/common';
import { ImageInfoPayload } from 'models';

interface ImageInfo {
  fileName: string;
  fileSizeInBytes: number;
  url: string;
}

const TodayPrograms: React.FC<any> = ({ route }: any) => {
  const isFocused = useIsFocused();
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [dataImage, setDataImage] = useState<any[]>([]);
  const [infoPayload, setInfoPayload] = useState<ImageInfoPayload[]>([]);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = React.useState<any>(null);

  const PAGE_SIZE = 10;

  const getData = useCallback(
    async (page: number = 1) => {
      try {
        if (!route.params?.item) return;

        setName(route.params.item.name);
        setRefreshing(true);
        // const response: any = await getProgrammesWithID(
        //   route.params.item.id,
        //   page,
        //   PAGE_SIZE,
        // );
        // console.log(JSON.stringify(response));
      } catch (error) {
        ShowToast('error', 'Notice', 'Something went wrong!');
      } finally {
        setRefreshing(false);
      }
    },
    [route.params?.item],
  );

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [getData, isFocused]);

  const requestLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(coordinates => {
        console.log('coordinates:  ' + JSON.stringify(coordinates));
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
            console.log('Kết quả:', currentAddress);
            setAddress(currentAddress);
          })
          .catch((error: any) => {
            console.error('Lỗi khi gửi yêu cầu:', error);
            ShowToast('error', 'Notice', 'Error get location current!');
          });
      })
      .catch((error: any) => {
        console.error('Lỗi khi gửi yêu cầu:', error);
        ShowToast('error', 'Notice', 'Error get location current!');
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
      const { index, item } = info;
      return (
        <View key={index} style={styles.imageContainer}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{ uri: item.uri }}>
              <View>
                <Text style={styles.detailedImageTxt}>
                  {moment(item.timestamp).format('MMMM DD, YYYY hh:mm A')}
                </Text>
                {address && (
                  <Text style={styles.detailedImageTxt}>{address}</Text>
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
    [address],
  );

  const renderSeparator = useCallback(
    () => <View style={{ height: sizes.s24 }} />,
    [],
  );

  const uploadImage = async (imageAssert: Asset[]): Promise<void> => {
    const base_url: string = 'https://api-camera.okvip.dev/api/files/upload';
    const formData: FormData = new FormData();
    if (imageAssert.length > 0) {
      imageAssert.forEach(image => {
        console.log(image);
        formData.append('files', {
          uri: image.uri,
          name: image.fileName,
          type: 'image/jpg',
        });
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
          console.log('[RESULT] ' + JSON.stringify(result.data));
          setDataImage(result.data);
          return result;
        }
      } catch (error) {
        console.log('Networking Failed!', error);
      }
    }
  };

  const onImagePickerResult = useCallback(
    (response: ImagePickerResponse) => {
      if (response?.assets) {
        let newData = [...data];
        newData = newData.concat(response?.assets);
        setData(newData);
      } else if (response.errorCode) {
        Alert.alert('Notice', response.errorCode);
      } else if (response.errorMessage) {
        Alert.alert('Notice', response.errorMessage);
      }
    },
    [data],
  );

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
    let myArray: ImageInfoPayload[] = [];
    if (name.length === 0) {
      return ShowToast('error', 'Notice', 'Please input name');
    } else {
      try {
        Loading.show();
        await uploadImage(data);
        console.log('DATA IMAGE:  ' + JSON.stringify(dataImage));

        if (address == null) {
          ShowToast(
            'error',
            'Notice',
            'Can not upload Image Because of Invalid Param!',
          );
        } else {
          dataImage.forEach((value) => {
            console.log('GIA TRI Value: ' + JSON.stringify(value));
            let commentData = {} as ImageInfoPayload;
            commentData.location = address;
            commentData.path = value.fileName;
            commentData.shootTime = moment(data[0].timestamp).format('MMMM DD, YYYY hh:mm A');
            commentData.size = value.fileSizeInBytes;
            commentData.programmeId = route.params?.item?.id;
            myArray.push(commentData);
          });
          console.log('DATA IMAGs myArray: ' + JSON.stringify(myArray));
          await Promise.all([
            uploadMultiImageInfo(myArray),
          ]);
          ShowToast('success', 'Notice', 'Upload Image Successful');
          setData([]);
        }
      } catch (error) {
        console.log('Error:  ' + JSON.stringify(error));
        ShowToast('error', 'Notice', 'Upload Image Failed!');
      } finally {
        Loading.hide();
      }
    }
  }, [data, name.length, route.params?.item?.id]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <Text style={[Style.txt24_primary, Style.bottom20]}>
          PROGRAM NAME: {name}
        </Text>
        <Button title="Take Image" onPress={onTakeImage} />
        <View style={{ height: sizes.s10 }} />
        <Button type="bluePrimary" title="Submit" onPress={onSubmit} />
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
