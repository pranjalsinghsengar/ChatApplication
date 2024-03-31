import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {styles} from '../styles/style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Storage} from '../context/storage';
// import {AsyncStorage} from 'react-native';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useContext(Storage);

  useEffect(() => {
    if (user) {
      navigation.navigate('home');
    } else {
      navigation.navigate('signin');
    }
  }, [user]);

  const handleSignIn = async () => {
    // const axios = require('axios');
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://chat-backend-mreh.onrender.com/signin',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const res = await axios.request(config);
    console.log('response.data', JSON.stringify(res.data));
    const jsonValue = JSON.stringify(res.data);

    if (jsonValue) {
      AsyncStorage.setItem('userData', jsonValue);
      navigation.navigate('home');
    }
  };

  return (
    <View style={[styles.container]}>
      <KeyboardAvoidingView>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <View
          style={[
            styles.flex,
            styles.row,
            styles.spaceEvenly,
            styles.itemsCenter,
          ]}>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text>Don't have an account?</Text>
          </TouchableOpacity>
          <Button mode="contained" onPress={handleSignIn} style={styles.button}>
            Sign In
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignIn;
