import React, {useCallback, useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getImageWithUserId} from 'service ';
import ShowToast from 'helpers/ShowToast';
import {Histories} from 'models';
import {Style, sizes, colors} from 'core';
import {goScreen} from 'helpers/navigation';
import moment from 'moment-timezone';
import Feather from 'react-native-vector-icons/Feather';
import {EmptyList} from 'components';
import {IMAGE_DOMAIN} from 'helpers/common';
import {ScreenProps} from 'root-stack-params';
import {UserContext} from 'contexts';

const PAGE_SIZE = 10;

const History: React.FC<ScreenProps<'detailedProgram'>> = () => {
  const isFocused = useIsFocused();
  const {user} = useContext(UserContext);
  const [data, setData] = useState<Histories[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const getData = useCallback(
    async (page: number = 1) => {
      try {
        if (!user?.id) return;
        setRefreshing(true);
        const response: any = await getImageWithUserId(
          user?.id!,
          page,
          PAGE_SIZE,
        );

        setData(response.data?.data);
      } catch (error) {
        ShowToast('error', 'Chú ý', 'Đã xảy ra lỗi!');
      } finally {
        setRefreshing(false);
      }
    },
    [user?.id],
  );

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [getData, isFocused]);

  const renderItem = useCallback((info: ListRenderItemInfo<Histories>) => {
    const {item} = info;
    const dataUpdate = {
      data: item,
    };

    const date1: Date = new Date(item.createdTime);
    const timeStamp: number = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday: number = timeStamp - 24 * 3600;

    const isEditable =
      date1.getTime() >= new Date(timeStampYesterday * 1000).getTime();

    return (
      <View style={stylesSheets.containers}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Image
              style={{
                width: sizes.s100,
                height: sizes.s100,
                marginTop: sizes.s10,
              }}
              source={{uri: IMAGE_DOMAIN + '/' + item.path}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 2, padding: sizes.s2}}>
            <Text numberOfLines={2} style={Style.txt14_blue}>
              {item.location}
            </Text>
            <Text style={stylesSheets.text}>
              Thời gian:{' '}
              {moment(item.createdTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}
            </Text>
            <Text style={stylesSheets.text}>
              Thời gian gửi:{' '}
              {moment(item.shootTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}
            </Text>
          </View>
        </View>
        {isEditable && (
          <TouchableOpacity
            style={stylesSheets.editButton}
            onPress={() => goScreen('editProgramImage', dataUpdate)}>
            <Feather
              name="edit"
              size={sizes.s13}
              color={colors.primaryE1}
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginRight: sizes.s5,
              }}
            />
            <Text style={{color: colors.primaryE1}}>Chỉnh sửa</Text>
          </TouchableOpacity>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  return (
    <View style={stylesSheets.container}>
      <View style={[Style.ph10, Style.pv10, Style.flex]}>
        <FlatList
          data={data}
          refreshing={refreshing}
          renderItem={renderItem}
          onRefresh={() => getData()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={
            <EmptyList
              title={'Chưa có dữ liệu'}
              hideSubMessage={true}
              hideButton={true}
            />
          }
        />
      </View>
    </View>
  );
};

export default History;

const stylesSheets = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemList: {
    ...Style.row,
    ...Style.border,
    paddingVertical: sizes.s12,
    backgroundColor: colors.white,
    borderColor: colors.bluePrimary,
  },
  containers: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: sizes.s8,
    borderColor: colors.gray400,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: sizes.s12,
    marginBottom: 8,
    color: colors.semanticsWarning,
  },
  editButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 2,
  },
});
