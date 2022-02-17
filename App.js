import React, { useEffect, useState } from 'react';
import { Alert, Button,ScrollView,StyleSheet, Text, View } from 'react-native';
import { Header } from './components/Header';
import { HomeScreen } from './page/HomeScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PasswordScreen } from './page/PasswordScreen';
import { VoiceScreen } from './page/VoiceScreen';
import { LoginScreen } from './page/LoginScreen';
import { RifornimentiScreen } from './page/RifornimentiScreen';
import { RifornimentoScreen } from './page/RifornimentoScreen';
import { AsyncStorage } from 'react-native';
import {token} from './services/api'



export default function App() {
  async function _retrieveData()  {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        token = value;
      }
    } catch (error) {
    }
  };
  useEffect(()=>{
    _retrieveData();
  },[]);
  const Stack = createStackNavigator();
  
  
  return (
    <NavigationContainer>      
      <Header title="Password Keeper by AlbertoZ"></Header>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Password" component={PasswordScreen} options={{ title: 'Visualizza' }}/>
        <Stack.Screen name="Voice" component={VoiceScreen} options={{ title: 'Voice' }}/>
        <Stack.Screen name="Rifornimenti" component={RifornimentiScreen} options={{ title: 'Rifornimenti' }}/>
        <Stack.Screen name="Rifornimento" component={RifornimentoScreen} options={{ title: 'Rifornimento' }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    

  );
}
