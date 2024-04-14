import {useContext} from 'react';
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
import {Storage} from '../context/storage';
import ScreenCard from './containers/screenCard';
import axios from 'axios';

const Friends = ({setOpenFriends}) => {
  const {user, allUsers} = useContext(Storage);
  const sendFriendRequest = (currentUserId, selectedUserId) => {
    try {
      let data = JSON.stringify({
        currentUserId: currentUserId,
        selectedUserId: selectedUserId,
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://chat-backend-mreh.onrender.com/friend-request',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          onPress={() => sendFriendRequest(user && user._id, item._id)}>
          <Text>+</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  return (
    <ScreenCard>
      <FlatList
        data={allUsers}
        renderItem={({item}) => <Item item={item} />}
        // keyExtractor={item => item.id}
      />
    </ScreenCard>
  );
};

export default Friends;

const styles = StyleSheet.create({});
