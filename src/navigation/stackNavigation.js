import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Home from '../screens/home';
import Storage from '../context/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageProvider from '../context/storage';
import Friends from '../screens/friendList';
import FriendRequests from '../screens/friendRequests';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StorageProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="signin"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="friends"
            component={Friends}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="friendrequests"
            component={FriendRequests}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </StorageProvider>
    </NavigationContainer>
  );
};

export default StackNavigation;
