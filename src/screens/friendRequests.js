import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import ScreenCard from './containers/screenCard';
import {Storage} from '../context/storage';

const FriendRequests = () => {
  const [reqestList, setRequestList] = useState();
  const {userID} = useContext(Storage);

  useEffect(() => {
    FetchRequests();
  }, []);
  console.log('userID', userID);
  const FetchRequests = () => {
    // let data = '';
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://chat-backend-mreh.onrender.com/friend-request/${userID}`,
      headers: {},
      //   data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(
          'friendRequestData',
          response.status,
          JSON.stringify(response.data),
        );
        if (response.status === 200) {
          //   const friendRequestData = response.data.map(friendRequest => ({
          //     _id: friendRequest.id,
          //     name: friendRequest.name,
          //     email: friendRequest.email,
          //     image: friendRequest.image,
          //   }));
          setRequestList(response.data);
        }
      })
      .catch(error => {
        console.log('friendRequestData', error);
      });
  };

  console.log('reqestList', reqestList);

  const Item = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: '#EDEBEB4B',
        }}>
        <Text style={{color: 'black', fontSize: 16}}>{item.name}</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          // onPress={() => sendFriendRequest(user && user._id, item._id)}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenCard>
      <FlatList
        data={reqestList}
        renderItem={({item}) => <Item item={item} />}
        // keyExtractor={item => item.id}
      />
    </ScreenCard>
  );
};

export default FriendRequests;
