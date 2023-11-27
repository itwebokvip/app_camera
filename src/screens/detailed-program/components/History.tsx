import React, { useCallback, useEffect, useState, useContext } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getImageWithUserId } from 'service ';
import ShowToast from 'helpers/ShowToast';
import { Histories } from 'models';
import { Style, sizes, colors } from 'core';
import { goScreen } from 'helpers/navigation';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { EmptyList } from 'components';
import { IMAGE_DOMAIN } from 'helpers/common';
import { ScreenProps } from 'root-stack-params';
import { UserContext } from 'contexts';

const PAGE_SIZE = 10;

const History: React.FC<ScreenProps<'detailedProgram'>> = () => {
  const isFocused = useIsFocused();
  const { user } = useContext(UserContext);
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

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Histories>) => {
      const { index, item } = info;
      const dataUpdate = {
        data: item,
      };

      const date1: Date = new Date(item.createdTime);
      const timeStamp: number = Math.round(new Date().getTime() / 1000);
      const timeStampYesterday: number = timeStamp - 24 * 3600;

      const isEditable =
        date1.getTime() >= new Date(timeStampYesterday * 1000).getTime();

      return (
        <TouchableOpacity style={stylesSheets.itemList} key={index}>
          <View style={[Style.flex, Style.left10]}>
            <Text numberOfLines={2} style={Style.txt14_blue}>
              {item.location}
            </Text>
            <Image
              style={{
                width: sizes.s100,
                height: sizes.s100,
                marginTop: sizes.s10,
              }}
              source={{ uri: IMAGE_DOMAIN + '/' + item.path }}
              resizeMode="contain"
            />
            <Text style={[Style.txt10_gray600, Style.pv8]}>
              Thời gian:{' '}
              {moment(item.createdTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}
            </Text>
            <Text style={[Style.txt10_gray600, Style.pv8]}>
              Thời gian gửi:{' '}
              {moment(item.shootTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}
            </Text>
          </View>
          {isEditable && (
            <View style={[Style.row, Style.ph8, { gap: sizes.s15 }]}>
              <TouchableOpacity
                onPress={() => goScreen('editProgramImage', dataUpdate)}>
                <MaterialCommunityIcons
                  size={sizes.s20}
                  name="pencil"
                  color={colors.gray1000}
                />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      );
    }, []);

  const renderSeparator = useCallback(
    () => <View style={{ height: sizes.s24 }} />,
    [],
  );

  return (
    <View style={stylesSheets.container}>
      <View style={[Style.ph20, Style.pv10, Style.flex]}>
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
    backgroundColor: colors.backgroundScreen,
  },
  itemList: {
    ...Style.row,
    ...Style.border,
    paddingVertical: sizes.s20,
    backgroundColor: colors.white,
    borderColor: colors.bluePrimary,
  },
});
