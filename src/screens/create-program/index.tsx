import React, {useCallback, useEffect, useState} from 'react';
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
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppTextInput, Button, Loading} from 'components';

import styles from './styles';
import {ImageInfoPayload} from 'models';
import {Style, colors, sizes} from 'core';
import ShowToast from 'helpers/ShowToast';
import {goBack} from 'helpers/navigation';
import Permissions from 'utils/Permissions';
import {ScreenProps} from 'root-stack-params';
import {createProgram, uploadMultiFiles, uploadMultiImageInfo} from 'service ';
import {GOOGLE_MAP_API_KEY} from 'helpers/common';

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
          '&key=' +
          GOOGLE_MAP_API_KEY;
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
      const {index, item} = info;
      return (
        <View key={index} style={styles.imageContainer}>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: item.uri}}>
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
    () => <View style={{height: sizes.s24}} />,
    [],
  );

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
    try {
      Loading.show();
      if (name.length === 0) {
        return ShowToast('error', 'Notice', 'Please input name');
      }
      const programResponse = await createProgram(name);
      if (!programResponse.success) {
        return ShowToast('error', 'Notice', programResponse?.error);
      }

      if (data.length > 0) {
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
            shootTime: moment(data[i].timestamp).format(
              'MMMM DD, YYYY hh:mm A',
            ),
            programmeId: programResponse.data.id,
          });
        }
        const imageInfoResponse = await uploadMultiImageInfo(payload);
        console.log('imageInfoResponse: >>>', imageInfoResponse);
      }

      ShowToast('success', 'Notice', 'Created program successfully!');
      setTimeout(() => {
        goBack();
      }, 1000);
    } catch (error) {
      ShowToast('error', 'Notice', 'Something went wrong!');
    } finally {
      Loading.hide();
    }
  }, [address, data, name]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
        <AppTextInput
          autoFocus
          placeholder="Please input program's name"
          onChangeText={setName}
        />
        <Button title="Take Image" onPress={onTakeImage} />
        <View style={{height: sizes.s10}} />
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
