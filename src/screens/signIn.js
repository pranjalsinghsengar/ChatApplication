import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {styles} from '../styles/style';
import axios from 'axios';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('https://chat-app-pn6s.onrender.com/login', user)
      .then(response => {
        console.log('signIn user', response.data);
        // Alert.alert('data', response.data);
        navigation.navigate('home');
      })
      .catch(err => {
        console.log('error', err);
        Alert.alert('error', err);

        // Handle the error appropriately, e.g., show an error message
      });
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
