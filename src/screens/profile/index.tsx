import {Style} from 'core';
import {KeychainManager, STORAGE_KEYS} from 'helpers/keychain';
import {User} from 'models';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      console.log('Raw data from KeychainManager:', data);

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
    setIsEditing(false);
  };

  // const handleInputChange = (key: keyof User, value: string) => {
  //     if (editedUserData) {
  //         setEditedUserData((prevData) => ({
  //             ...prevData,
  //             [key]: value,
  //         }));
  //     }
  // };

  return (
    <View style={Style.p20}>
      {dataUser && (
        <View style={{marginBottom: 20}}>
          <View style={{marginBottom: 10}}>
            <Text style={Style.txt14_black}>
              Tên đăng nhập:{' '}
              {isEditing ? editedUserData?.username : dataUser.username}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={Style.txt14_black}>
              Email: {isEditing ? editedUserData?.email : dataUser.email}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={Style.txt14_black}>
              Họ và tên:{' '}
              {isEditing ? editedUserData?.fullName : dataUser.fullName}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={Style.txt14_black}>
              Số điện thoại:{' '}
              {isEditing ? editedUserData?.phoneNumber : dataUser.phoneNumber}
            </Text>
          </View>
        </View>
      )}

      {/* {isEditing && editedUserData && (
        <View>
          <Text style={[Style.txt16_black_bold, Style.mv12]}>Edit Profile</Text>
          <TextInput
            style={{
              marginBottom: 10,
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
              color: 'grey',
            }}
            value={editedUserData.username}
            //onChangeText={(text) => handleInputChange('username', text)}
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
            //onChangeText={(text) => handleInputChange('email', text)}
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
            //onChangeText={(text) => handleInputChange('fullName', text)}
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
            //onChangeText={(text) => handleInputChange('phoneNumber', text)}
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
              <Text style={{color: 'white'}}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={handleEditPress}>
        <View
          style={{
            backgroundColor: 'green',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileScreen;
