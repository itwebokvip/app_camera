import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import moment from 'moment';

import { Style } from 'core';
import Resubmit from './ResubmitImage';

const UpdateImageProgram: React.FC<any> = ({ route }: any) => {
  const { data } = route.params.dataUpdate;
  return (
    <ScrollView style={Style.container}>
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <Text style={[Style.txt14_black, Style.p8]}>
            Created Time:{' '}
            {moment(data.createdTime).format(
              'MMMM DD, YYYY hh:mm A',
            )}
          </Text>
          <Text style={[Style.txt14_black, Style.p8]}>
            Location: {data.location}
          </Text>
        </View>
      </View>
      <Resubmit params={data} />
    </ScrollView>
  );
};

export default UpdateImageProgram;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 16,
    marginTop: 10,
    padding: 20,
    borderRadius: 8,
  },
  infoContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'blue',
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
