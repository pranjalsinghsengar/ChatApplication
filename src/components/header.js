import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';

const Header = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    UserHandler();
  }, []);

  const UserHandler = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');

      const StorageUserData = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserDetails(StorageUserData);
    } catch (e) {
      // error reading value
    }
  };
  const [findUser, setFindUser] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    SearchUser();
    if (findUser === '') {
      setSearchedData([]);
    }
  }, [findUser]);

  const SearchUser = () => {
    let data = JSON.stringify({
      name: findUser,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chat-backend-mreh.onrender.com/search',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        if (response) {
          setSearchedData([response.data]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        position: 'relative',
        // backgroundColor: 'white',
      }}>
      <View
        style={{
          height: 50,
          //   backgroundColor: '#202020',
          borderWidth: 2,

          borderColor: 'black',
          borderRadius: 500,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 4,
          paddingHorizontal: 4,
        }}>
        <TextInput
          placeholder="Search user"
          placeholderTextColor={'#4D4D4D5F'}
          onChangeText={setFindUser}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 500,
            paddingHorizontal: 20,
            color: '#4D4D4DB3',
          }}
        />
        <Text style={{color: 'black', marginHorizontal: 20}}>
          {userDetails && userDetails.name} x unknown
        </Text>
      </View>

      {searchedData.length !== 0 && (
        <View
          style={{
            // backgroundColor: 'red',
            width: '90%',
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'black',
            position: 'absolute',
            top: '150%',
          }}>
          <FlatList
            data={searchedData}
            renderItem={({item}) => <Item item={item} />}
            // keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;

export const Item = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        // backgroundColor: '#EDEBEB4B',
        backgroundColor: '#CACACA4E',
      }}>
      <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          paddingHorizontal: 15,
          paddingVertical: 5,
          borderRadius: 5,
        }}
        onPress={() => console.log(item.name, item._id)}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};
