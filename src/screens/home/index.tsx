import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DemoTitle, EmptyList} from 'components';

import ShowToast from 'helpers/ShowToast';
import {Style, colors, sizes} from 'core';
import {goScreen} from 'helpers/navigation';

const FuncComponent: React.FC = () => {
  const isFocused = useIsFocused();

  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getData = useCallback((page: number = 1) => {
    try {
      setRefreshing(true);
    } catch (error) {
      ShowToast('error', 'Notice', 'Something went wrong!');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [getData, isFocused]);

  const onLoadMore = useCallback(() => {}, []);

  const renderItem = useCallback((info: ListRenderItemInfo<any>) => {
    const {index, item} = info;
    return (
      <TouchableOpacity
        style={styles.itemList}
        key={index}
        onPress={() => goScreen('detailedProgram')}>
        <View style={[Style.flex, Style.left10]}>
          <Text numberOfLines={2} style={Style.txt14_blue}>
            Nhưng nó là ecommerce web side Nhưng nó là ecommerce web side
          </Text>
        </View>
        <View style={[Style.row, Style.ph10, {gap: sizes.s10}]}>
          <TouchableOpacity onPress={() => goScreen('detailedProgram')}>
            <MaterialCommunityIcons
              size={sizes.s25}
              name="pencil"
              color={colors.gray1000}
            />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={Style.hitSlop4}>
            <MaterialCommunityIcons
              size={sizes.s25}
              name="delete"
              color={colors.error}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  return (
    <View style={styles.container}>
      <DemoTitle>🌄 Program List</DemoTitle>
      <View style={[Style.ph20, Style.pv10]}>
        <FlatList
          data={data}
          refreshing={refreshing}
          renderItem={renderItem}
          onEndReached={onLoadMore}
          onRefresh={() => getData()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<EmptyList title={`Not found`} />}
        />
      </View>
    </View>
  );
};

export default FuncComponent;

const styles = StyleSheet.create({
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
