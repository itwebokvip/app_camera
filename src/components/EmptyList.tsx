import { images } from 'assets';
import { Button } from 'components';
import { colors, sizes, Style } from 'core/index';
import { goScreen } from 'helpers/navigation';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
interface IProps {
  title: string;
  imagesEmpty?: any;
  hideButton?: boolean;
  hideSubMessage?: boolean;
}
const EmptyList: React.FC<IProps> = ({
  title,
  imagesEmpty,
  hideButton = false,
  hideSubMessage = false,
}) => {
  const onCreateRequest = () => goScreen('createProgram');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={imagesEmpty || images.not_found} style={styles.image} />
      {hideSubMessage ? (
        <React.Fragment />
      ) : (
        <Text style={styles.subTitle}>
          Create a program in a few steps, really simple!
        </Text>
      )}

      {hideButton ? (
        <></>
      ) : (
        <Button
          type="bluePrimary"
          onPress={onCreateRequest}
          title="Create a program"
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

export default React.memo(EmptyList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizes.s24,
    marginTop: sizes.s24,
    paddingBottom: sizes.s100,
  },
  title: {
    ...Style.txt24_gray,
    color: colors.gray800,
    textAlign: 'center',
  },
  image: {
    width: 340,
    height: sizes.s200,
    marginVertical: sizes.s24,
    resizeMode: 'contain',
  },
  subTitle: {
    ...Style.txt16,
    color: '#000000',
    marginBottom: sizes.s24,
    textAlign: 'center',
  },
});
