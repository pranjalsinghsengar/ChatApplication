import React, {useState} from 'react';
import {View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {styles} from '../styles/style';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
            <Text>don't have account</Text>
          </TouchableOpacity>
          <Button mode="contained" onPress={handleSignIn} style={styles.button}>
            Sign In
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   input: {
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   button: {
//     marginTop: 20,
//   },
// });

export default SignIn;
