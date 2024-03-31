import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState, createContext} from 'react';
import axios from 'axios';

export const Storage = createContext();

const StorageProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState();
  const [openCard, setOpenCard] = useState();

  useEffect(() => {
    userData();
    ALLUserData();
  }, []);

  const userData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      const userDetails = jsonValue != null ? JSON.parse(jsonValue) : null;
      setUser(userDetails);
    } catch (e) {
      // error reading value
    }
  };

  const ALLUserData = () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://chat-backend-mreh.onrender.com/users',
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setAllUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // console.log('user', user);
  // console.log('allUsers', allUsers);
  return (
    <Storage.Provider value={{allUsers, user, openCard, setOpenCard}}>
      {children}
    </Storage.Provider>
  );
};

export default StorageProvider;
