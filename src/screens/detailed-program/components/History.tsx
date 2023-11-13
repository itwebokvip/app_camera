import React, {useCallback, useEffect, useState} from 'react';
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
import {getProgrammesWithID} from 'service ';
import ShowToast from 'helpers/ShowToast';
import {Histories} from 'models';
import {Style, sizes, colors} from 'core';
import {goScreen} from 'helpers/navigation';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {EmptyList} from 'components';
import {IMAGE_DOMAIN} from 'helpers/common';

const PAGE_SIZE = 30;

const History: React.FC<any> = ({route}: any) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState<Histories[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getData = useCallback(
    async (page: number = 1) => {
      try {
        setRefreshing(true);
        const response: any = await getProgrammesWithID(
          route.params?.item?.id,
          page,
          PAGE_SIZE,
        );
        console.log('[HISTORY] Response:  ' + JSON.stringify(response));
        setData(response.data?.data);
      } catch (error) {
        ShowToast('error', 'Notice', 'Something went wrong!');
      } finally {
        setRefreshing(false);
      }
    },
    [route],
  );

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [getData, isFocused]);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Histories>) => {
      const {index, item} = info;
      const dataUpdate = {
        programId: route.params?.item?.id,
        name: route.params?.item.name,
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
              source={{uri: IMAGE_DOMAIN + '/' + item.path}}
            />
            <Text style={[Style.txt10_gray600, Style.pv8]}>
              {moment(item.createdTime).format('MMMM DD, YYYY hh:mm A')}
            </Text>
          </View>
          {isEditable && (
            <View style={[Style.row, Style.ph8, {gap: sizes.s15}]}>
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
    },
    [route.params?.item?.id, route.params?.item?.name],
  );

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  return (
    <View style={stylesSheets.container}>
      <View style={[Style.ph20, Style.pv10, Style.flex]}>
        <FlatList
          data={data}
          refreshing={refreshing}
          renderItem={renderItem}
          //onEndReached={onLoadMore}
          onRefresh={() => getData()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={
            <EmptyList
              title={`Not found`}
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