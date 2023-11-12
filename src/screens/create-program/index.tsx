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

import axios from 'axios';
import moment from 'moment';
import GetLocation from 'react-native-get-location';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppTextInput, Button, Loading } from 'components';

import styles from './styles';
import { Style, colors, sizes } from 'core';
import ShowToast from 'helpers/ShowToast';
import Permissions from 'utils/Permissions';
import { ScreenProps } from 'root-stack-params';
import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';
import { UploadImage, postProgrammesName } from 'service ';

const FuncComponent: React.FC<ScreenProps<'createProgram'>> = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = React.useState<any>(null);

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
          '&key=AIzaSyA21JwqECJSJuIoHQ4nDZEaKI8Ol9KoDbg';
        axios
          .get(mapUrl)
          .then(response => {
            const mapData = response.data;
            console.log('mapData: >>>', mapData);
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
    console.log('JSON:  ' + JSON.stringify(imageAssert));
    if (imageAssert.length > 0) {
      imageAssert.forEach((image) => {
        console.log(image);
        formData.append('files', {
          uri: image.uri,
          name: image.fileName,
          type: 'image/jpg',
        });
      });

      console.log('TEST:  ' + JSON.stringify(formData));
      const token = await KeychainManager.getItem(STORAGE_KEYS.token);

      try {
        const res = await fetch(base_url, {
          method: 'post',
          body: formData,
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
        console.log('finally Failed!', Error);
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

  const inputNameProgram = useCallback(async () => {
    if (name.length > 0) {
      await Promise.all([postProgrammesName(name)]);
      console.log('done');
    }
  }, [name]);

  const onSubmit = useCallback(async () => {
    if (name.length === 0) {
      return ShowToast('error', 'Notice', 'Please input name');
    } else {
      try {
        Loading.show();
        await inputNameProgram();
        const image = await uploadImage(data);
        console.log('Image:  ' + image);
        if (image == null) {
          ShowToast(
            'error',
            'Notice',
            'Can not upload Image Because of Invalid Param!',
          );
        } else {
          await Promise.all([
            UploadImage(
              data[0].fileSize!,
              'TP.HCM, Viet Nam',
              image,
              moment(data[0].timestamp).format(
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
    }
  }, [name.length]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <AppTextInput
          autoFocus
          placeholder="Please input program's name"
          onChangeText={setName}
        />
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

export default FuncComponent;
