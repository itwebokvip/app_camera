import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles';
import {updateImageInfos} from 'service ';
import ShowToast from 'helpers/ShowToast';

import moment from 'moment';
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Permissions from 'utils/Permissions';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';

import {Button, Loading} from 'components';
import {Style, colors, sizes} from 'core';
import {goBack} from 'helpers/navigation';

const Resubmit: React.FC<any> = ({params}: any) => {
  const [data, setData] = useState<any[]>([]);

  const onDeleteImg = (index: number) => {
    setData(oldData => oldData.filter((_, i) => i !== index));
  };

  const renderItem = useCallback((info: ListRenderItemInfo<Asset>) => {
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
  }, []);

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  const uploadImage = async (imageAssert: Asset[]): Promise<void> => {
    const base_url: string = 'https://api-camera.okvip.dev/api/files/upload';
    const formData: FormData = new FormData();
    console.log('JSON Nhan Duoc:  ' + JSON.stringify(imageAssert));
    if (imageAssert.length > 0) {
      imageAssert.forEach(image => {
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
    if (params.name.length === 0) {
      return ShowToast('error', 'Notice', 'Please input name');
    } else {
      try {
        Loading.show();
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
            updateImageInfos(
              data[0].fileSize!,
              'TP.HCM, Viet Nam',
              image,
              params.programId,
              moment(data[0].timestamp).format('MMMM DD, YYYY hh:mm A'),
              params.data.id,
            ),
          ]);
          ShowToast('success', 'Notice', 'Upload Image Successful');
          goBack();
        }
      } catch (error) {
        console.log('Error:  ' + JSON.stringify(error));
        ShowToast('error', 'Notice', 'Upload Image Failed!');
      } finally {
        Loading.hide();
      }
    }
  }, [data, params.data.id, params.name.length, params.programId]);

  return (
    <View style={Style.container}>
      <View style={Style.top20}>
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

export default Resubmit;
