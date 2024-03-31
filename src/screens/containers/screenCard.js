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
import {Storage} from '../../context/storage';

const ScreenCard = ({children}) => {
  const {setOpenCard} = useContext(Storage);
  return (
    <View
      style={{
        backgroundColor: '#93939343',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          // borderWidth: 1,
          borderColor: 'black',
          padding: 15,
          borderRadius: 10,
          width: '90%',
          minHeight: '50%',
          maxHeight: '70%',
          backgroundColor: 'white',
        }}>
        {children}

        <TouchableOpacity
          onPress={() => setOpenCard('')}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 10,
            padding: 10,
            paddingHorizontal: 15,
            borderRadius: 5,
            borderWidth: 1,
            // backgroundColor: 'orange',
          }}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenCard;
