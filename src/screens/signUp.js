// src/SignUpScreen.js

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    axios
      .post('https://chat-app-pn6s.onrender.com/register', user)
      .then(response => {
        console.log(JSON.stringify(response.data));
        Alert.alert('ho gya');
        navigation.navigate('signin');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('nhi hua');
      });
  };
  // useEffect(() => {
  //   axios
  //     .post('http://10.0.2.2:8000/register')
  //     .then(response => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
          // secureTextEntry
          style={styles.input}
        />
        <TextInput
          label="Confirm Password"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate('signin')}
          style={{marginTop: 35, fontWeight: 900}}>
          <Text>back to sign in</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default SignUp;
