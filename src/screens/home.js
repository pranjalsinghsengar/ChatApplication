import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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
import FriendRequests from './friendRequests';
import axios from 'axios';

const Home = ({navigation}) => {
  const {openCard, setOpenCard} = useContext(Storage);

  // const {userDetails} = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState('');
  const [input, setInput] = useState('');
  const [inCommingData, setInCommingData] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [data, setData] = useState([]);

  const SendHandler = () => {
    // setData([...data, {message: input, user: user}]);
    let data = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: input,
            },
          ],
        },
      ],
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCk6q9t3TXKu8tMrlupmzLxQsGKVtVATek',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios.request(config).then(response => {
      console.log(
        JSON.stringify(response.data.candidates[0].content.parts[0].text),
      );
      const massage = response.data.candidates[0].content.parts[0].text;
      setInputData({message: input, user: user});
      if (massage) {
        setInCommingData({message: massage, user: 'Ai'});
      }
      // setInput('');
      // setData([
      //   ...data,
      //   {
      //     message: massage,
      //     user: 'Ai',
      //   },
      // ]);
    });

    // setData([...data, {message: input, user: user}]);
    // setInput('');
  };

  useEffect(() => {
    if (inCommingData !== null) {
      setData([...data, inCommingData]);
      setInCommingData(null);
    } else if (inputData !== null) {
      setData([...data, inputData]);
      setInputData(null);
      setInput('');
    } else if (data.length > 0) {
      const jsonValue = JSON.stringify(data);
      AsyncStorage.setItem('data', jsonValue);
    }
  }, [inCommingData, inputData]);

  // const DelteData = (item, i) => {
  //   data.filter(fl => {
  //     if (i) {
  //       if (fl.user === !item.user && fl.message === !item.message) {
  //         setData([...data, fl]);
  //       }
  //     }
  //   });
  // };
  useEffect(() => {
    UserHandler();
    DataHandler();
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

  const DataHandler = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data');
      const StorageUserData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (StorageUserData) {
        setData(StorageUserData);
        console.log('StorageUserData', StorageUserData);
      }
    } catch (error) {}
  };

  console.log(
    'inCommingData',
    // inCommingData && inCommingData[0].content.parts[0].text,
    data,
  );
  const ChatMassages = ({item}) => {
    console.log('item.user', item.user);
    const IsUser = user === item.user ? true : false;
    return (
      <TouchableOpacity
        // key={i}
        // onPress={() => DelteData(item)}
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
              maxWidth: '80%',
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
  };
  return (
    <View
      style={{flex: 1, position: 'relative', height: '100%', width: '100%'}}>
      <Header />

      <FlatList
        data={data}
        renderItem={item => ChatMassages(item)}
        style={{flex: 1}}
      />

      <View
        style={[
          // styles.itemsCenter,
          {
            flex: 1 / 6,
            // position: 'absolute',
            // bottom: 0,
            // paddingBottom: 30,
            // width: '100%',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
            paddingTop: 15,
            gap: 15,
          },
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
              onChangeText={setUser}
              style={{color: 'grey'}}
              placeholder={`Your Name`}
            /> */}

            {/* <Text style={{flex: 1, color: 'grey'}}>{user}</Text> */}
            <TextInput
              value={input}
              onChangeText={setInput}
              style={{
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
      {openCard === 'requests' && <FriendRequests />}
    </View>
  );
};

export default Home;
