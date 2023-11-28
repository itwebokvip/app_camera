import { Loading } from 'components';
import { Style } from 'core';
import ShowToast from 'helpers/ShowToast';
import { KeychainManager, STORAGE_KEYS } from 'helpers/keychain';
import { User } from 'models';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { updateProfileUser } from 'service ';

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [dataUser, setDataUser] = useState<User | null>(null);
  const [editedUserData, setEditedUserData] = useState<User | null>(null);

  useEffect(() => {
    fetchDataAndSetUserData();
  }, []);

  const fetchDataAndSetUserData = async () => {
    try {
      const data: any = await KeychainManager.multiGet([STORAGE_KEYS.account]);

      const [user] = data || [];
      console.log('Received user data:', user);

      if (user) {
        setDataUser(user);
        setEditedUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSavePress = () => {
    updateUser();
    setIsEditing(false);
  };

  const updateUser = async () => {
    Loading.show();
    console.log('[USER]  ' + JSON.stringify(editedUserData));
    if (editedUserData != null) {
      try {
        const [result] = await Promise.all([
          updateProfileUser(
            dataUser!.id,
            editedUserData!.email,
            editedUserData!.fullName,
            editedUserData!.phoneNumber,
          ),
        ]);
        console.log('KET QUA:  ' + JSON.stringify(result));
        if (result.Success === false) {
          ShowToast('error', 'Thông báo', 'Đã có lỗi xảy ra!');
        } else {
          ShowToast('success', 'Thông báo', 'Cập nhật thông tin thành công!');
        }
      } catch (error) {
        ShowToast('error', 'Thông báo', 'Đã có lỗi xảy ra!');
      } finally {
        Loading.hide();
      }
    }
  };

  const handleInputChange = (key: keyof User, value: string) => {
    if (editedUserData) {
      setEditedUserData(prevData => {
        if (!prevData) {
          return prevData;
        }
        return {
          ...(prevData as User),
          [key]: value,
        };
      });
    }
  };

  return (
    <ScrollView style={[Style.p20, Style.container]}>
      {dataUser && (
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={Style.txt14_white}>
              Tên đăng nhập:{' '}
              {isEditing ? editedUserData?.username : dataUser.username}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={Style.txt14_white}>
              Email: {isEditing ? editedUserData?.email : dataUser.email}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={Style.txt14_white}>
              Họ và tên:{' '}
              {isEditing ? editedUserData?.fullName : dataUser.fullName}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={Style.txt14_white}>
              Số điện thoại:{' '}
              {isEditing ? editedUserData?.phoneNumber : dataUser.phoneNumber}
            </Text>
          </View>
        </View>
      )}

      {isEditing && editedUserData && (
        <View>
          <Text style={[Style.txt16_white_bold, Style.mv12]}>
            Chỉnh sửa thông tin
          </Text>
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              color: 'grey',
            }}
            value={editedUserData.username}
            onChangeText={text => handleInputChange('username', text)}
            placeholder="Username"
            placeholderTextColor={'black'}
          />
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              color: 'grey',
            }}
            value={editedUserData.email}
            onChangeText={text => handleInputChange('email', text)}
            placeholder="Email"
          />
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              color: 'grey',
            }}
            value={editedUserData.fullName}
            onChangeText={text => handleInputChange('fullName', text)}
            placeholder="Full Name"
          />
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              color: 'grey',
            }}
            value={editedUserData.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
            placeholder="Phone Number"
          />
          <TouchableOpacity onPress={handleSavePress} style={Style.mv10}>
            <View
              style={{
                backgroundColor: 'blue',
                padding: 15,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white' }}>Lưu</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {dataUser?.listRole[0] === 'EMPLOYEE' ? null : (
        <TouchableOpacity onPress={handleEditPress}>
          <View
            style={{
              backgroundColor: 'green',
              padding: 15,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white' }}>
              {isEditing ? 'Hủy' : 'Chỉnh sửa'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;
