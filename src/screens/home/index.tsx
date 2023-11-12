import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DemoTitle, EmptyList} from 'components';

import {Program} from 'models';
import {UserContext} from 'contexts';
import {Style, colors, sizes} from 'core';
import ShowToast from 'helpers/ShowToast';
import {goScreen} from 'helpers/navigation';
import {deleteProgram, getProgrammes} from 'service ';

const PAGE_SIZE = 1;

const FuncComponent: React.FC = () => {
  const isFocused = useIsFocused();
  const {user, logoutUser} = useContext(UserContext);

  const [data, setData] = useState<Program[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getData = useCallback(
    async (page: number = 1) => {
      try {
        if (!user?.id) {
          return logoutUser();
        }

        setRefreshing(true);
        const response: any = await getProgrammes(page, PAGE_SIZE, user?.id);
        if (page === 1) {
          setData(response.data.data);
        } else {
          setData(oldData => [...oldData, ...response.data.data]);
        }
        setTotal(response.totalCount);
      } catch (error) {
        ShowToast('error', 'Notice', 'Something went wrong!');
      } finally {
        setRefreshing(false);
      }
    },
    [logoutUser, user?.id],
  );

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [getData, isFocused]);

  const onLoadMore = useCallback(() => {
    if (data.length < total) {
      const nextPage = current + 1;
      setCurrent(nextPage);
    }
  }, [current, data.length, total]);

  const onDeleteProgram = async (id: string) => {
    const response = await deleteProgram(id);
    if (response.success) {
      setData(oldData => oldData.filter(item => item.id !== id));
      ShowToast('success', 'Notice', 'Removed program successfully!');
    } else {
      ShowToast('error', 'Notice', response.error);
    }
  };

  const onDeleteConfirmation = useCallback((program: Program) => {
    Alert.alert(
      'Are your sure?',
      `This program '${program.name}' will be removed!`,
      [
        {
          text: 'Delele',
          onPress: () => onDeleteProgram(program.id),
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  }, []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Program>) => {
      const {index, item} = info;
      return (
        <TouchableOpacity
          style={styles.itemList}
          key={index}
          onPress={() => goScreen('detailedProgram')}>
          <View style={[Style.flex, Style.left10]}>
            <Text numberOfLines={2} style={Style.txt14_blue}>
              {item.name}
            </Text>
            <Text style={[Style.txt10_gray600]}>
              {moment(item.createdTime).format('MMMM DD, YYYY hh:mm A')}
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
            <TouchableOpacity
              hitSlop={Style.hitSlop4}
              onPress={() => onDeleteConfirmation(item)}>
              <MaterialCommunityIcons
                size={sizes.s25}
                name="delete"
                color={colors.error}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    },
    [onDeleteConfirmation],
  );

  const renderSeparator = useCallback(
    () => <View style={{height: sizes.s24}} />,
    [],
  );

  return (
    <View style={styles.container}>
      <DemoTitle>🌄 Program List</DemoTitle>
      <View style={[Style.ph20, Style.pv10, Style.flex]}>
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
