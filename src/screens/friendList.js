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

const Friends = ({setOpenFriends}) => {
  const {allUsers} = useContext(Storage);

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
          onPress={() => console.log(item.name, item._id)}>
          <Text>+</Text>
        </TouchableOpacity>
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
