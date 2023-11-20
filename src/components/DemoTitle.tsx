import { Style, colors, sizes } from 'core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import StatusBarView from './StatusBarView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { goReset, goScreen } from 'helpers/navigation';
import { UserContext } from 'contexts';
import { Menu, MenuItem } from 'react-native-material-menu';


interface Props {
  children: string;
}

export function DemoTitle({ children }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const { user, logoutUser } = React.useContext(UserContext);
  const handleDropdownPress = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option: string) => {
    console.log('Selected option:', option);
    if (option === 'Tài Khoản') {
      goScreen('profileScreen');
    } else if (option === 'Đăng xuất') {
      if (!user?.id) {
        return logoutUser();
      }
      goReset('auth');
    }
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBarView lightContent backgroundColor={colors.bluePrimary} />
      <View style={[Style.w100, Style.block_center]}>
        <Text style={styles.text}>{children}</Text>
        {/* <TouchableOpacity
          style={{ position: 'absolute', right: sizes.s30 }}
          onPress={() => goScreen('createProgram')}>
          <MaterialCommunityIcons
            name="plus-box"
            size={sizes.s30}
            color={'white'}
          />
        </TouchableOpacity> */}
        <View style={{ position: 'absolute', right: 2 }}>
          <Menu
            visible={isDropdownVisible}
            anchor={<TouchableOpacity
              onPress={handleDropdownPress}>
              <MaterialCommunityIcons
                name={isDropdownVisible ? 'menu-up' : 'dots-vertical'}
                size={sizes.s28}
                color={'white'}
              />
            </TouchableOpacity>}
            onRequestClose={handleDropdownPress}
          >
            <MenuItem textStyle={Style.txt14_black} onPress={() => {
              handleOptionPress('Tài Khoản');
            }}>Tài Khoản</MenuItem>
            <MenuItem textStyle={Style.txt14_black} onPress={() => {
              handleOptionPress('Đăng xuất');
            }}>Đăng xuất</MenuItem>
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
    paddingVertical: sizes.s10,
    backgroundColor: colors.bluePrimary,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
  dropdownContainer: {
    position: 'absolute',
    top: sizes.s60,
    right: sizes.s20,
    backgroundColor: 'white',
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
