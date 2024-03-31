import React, {Component, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {styles} from '../styles/style';
import Header from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friends from './friendList';
import {Storage} from '../context/storage';
import TextButtons from '../components/TextButtons';

const Home = ({navigation}) => {
  const {openCard, setOpenCard} = useContext(Storage);

  // const {userDetails} = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState('');
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);

  const SendHandler = () => {
    setData([...data, {message: input, user: user}]);
    setInput('');
  };

  const DelteData = (item, i) => {
    data.filter(fl => {
      if (i) {
        if (fl.user === !item.user && fl.message === !item.message) {
          setData([...data, fl]);
        }
      }
    });
  };

  useEffect(() => {
    UserHandler();
  }, []);

  const UserHandler = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');

      const StorageUserData = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUserDetails(StorageUserData);
      setUser(StorageUserData.name);
    } catch (e) {
      // error reading value
    }
  };

  // console.log('HOME', userDetails);
  return (
    <View
      style={{flex: 1, position: 'relative', height: '100%', width: '100%'}}>
      <Header />
      <View>
        {data &&
          data.map((item, i) => {
            const IsUser = user === item.user ? true : false;
            // console.log(IsUser);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => DelteData(item, i)}
                style={[
                  IsUser
                    ? {alignItems: 'flex-end', marginRight: 15}
                    : {alignItems: 'flex-start', marginLeft: 15},
                  {marginVertical: 5},
                ]}>
                <View
                  style={[
                    IsUser && {borderStyle: 'dashed'},
                    {
                      borderWidth: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 10,
                      maxWidth: '60%',
                    },
                  ]}>
                  <Text
                    style={[
                      IsUser && {textAlign: 'right'},
                      {
                        fontSize: 10,
                        marginBottom: 3,
                        fontWeight: '700',
                        fontStyle: 'italic',
                        // fontFamily: 'cursive',
                      },
                    ]}>
                    {item.user}
                  </Text>
                  <Text>{item.message}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
      <View
        style={[
          styles.itemsCenter,
          {position: 'absolute', bottom: 20, width: '100%'},
        ]}>
        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            gap: 10,
            width: '90%',
          }}>
          <TextButtons text="Friends" onPress={() => setOpenCard('friends')} />
          <TextButtons text="Groups" onPress={() => setOpenCard('groups')} />
          <TextButtons
            text="Friend request"
            onPress={() => setOpenCard('requests')}
          />
        </View>
        <View style={[styles.row, {width: '90%', gap: 10}]}>
          {/* <Button title="x"></Button> */}
          <View style={{flex: 1}}>
            {/* <TextInput
              value={user}
              // onChangeText={setUser}
              style={{flex: 1, color: 'grey'}}
              placeholder={`Your Name`}
            /> */}

            {/* <Text style={{flex: 1, color: 'grey'}}>{user}</Text> */}
            <TextInput
              value={input}
              onChangeText={setInput}
              style={{
                flex: 1,
                color: 'black',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
              placeholder={`Let's chat`}
              placeholderTextColor={'#4D4D4D5F'}
            />
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              justifyContent: 'center',
            }}
            onPress={SendHandler}
            disabled={!input}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {openCard === 'friends' && <Friends />}
      {openCard === 'groups' && <Friends />}
      {openCard === 'requests' && <Friends />}
    </View>
  );
};

export default Home;
