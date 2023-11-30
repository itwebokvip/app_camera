import { Style, colors, sizes } from 'core';
import * as React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import StatusBarView from './StatusBarView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { goReset, goScreen } from 'helpers/navigation';
import { UserContext } from 'contexts';
import { Menu, MenuItem } from 'react-native-material-menu';
import { KeychainManager } from 'helpers/keychain';
const win = Dimensions.get('window');
interface Props {
  children: string;
}

export function DemoTitle({ children }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const { user, logoutUser } = React.useContext(UserContext);
  const handleDropdownPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = async (option: string) => {
    console.log('Selected option:', option);
    if (option === 'Tài Khoản') {
      goScreen('profileScreen');
    } else if (option === 'Đăng xuất') {
      if (!user?.id) {
        await KeychainManager.clear();
        return logoutUser();
      }
      goReset('auth');
    }
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBarView lightContent backgroundColor={colors.white} />
      <View style={[Style.w100, Style.block_center]}>
        <ImageBackground style={{ width: 130, height: win.width * 0.2 }} source={require('../assets/images/logo-okvip-group.png')} resizeMethod='resize' />
        <View style={{ position: 'absolute', right: 2 }}>
          <Menu
            visible={isDropdownVisible}
            anchor={
              <TouchableOpacity onPress={handleDropdownPress}>
                <MaterialCommunityIcons
                  name={isDropdownVisible ? 'menu-up' : 'dots-vertical'}
                  size={sizes.s28}
                  color={'black'}
                />
              </TouchableOpacity>
            }
            onRequestClose={handleDropdownPress}>
            <MenuItem
              textStyle={Style.txt14_black}
              onPress={() => {
                handleOptionPress('Tài Khoản');
              }}>
              Tài Khoản
            </MenuItem>
            <MenuItem
              textStyle={Style.txt14_black}
              onPress={() => {
                handleOptionPress('Đăng xuất');
              }}>
              Đăng xuất
            </MenuItem>
          </Menu>
        </View>

        {/* <View style={{ position: 'absolute', right: 2 }}>
          <TouchableOpacity
            onPress={handleDropdownPress}>
            <MaterialCommunityIcons
              name={isDropdownVisible ? 'menu-up' : 'dots-vertical'}
              size={sizes.s28}
              color={'white'}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  dropdownContainer: ViewStyle;
  dropdownOption: ViewStyle;
  dropdownOptionText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes.s20,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
  dropdownContainer: {
    position: 'absolute',
    top: sizes.s60,
    right: sizes.s20,
    backgroundColor: 'black',
    borderRadius: sizes.s8,
    elevation: 5,
  },
  dropdownOption: {
    padding: sizes.s10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownOptionText: {
    fontSize: sizes.s16,
  },
});
