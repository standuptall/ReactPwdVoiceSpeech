import React, { useEffect, useState } from 'react';
import { Alert, Button,ScrollView,StyleSheet, Text, View ,TextInput} from 'react-native';
import {api} from '../services/api'
import { AsyncStorage } from 'react-native';
import {token} from '../services/api'

import {Styles} from '../components/Styles'




export function LoginScreen(props){
    const [user,setUser] = useState("");
    const [password,setPassword] = useState("");
    async function storeData(key,value)  {
        try {
            await AsyncStorage.setItem(
                key,value
            );
            props.navigation.navigate("Home",{});
        } catch (error) {
        }
    };
    return <View>
        <Text style={Styles.label}>Nome utente</Text>
        <TextInput style={Styles.input} value={user} onChangeText={setUser} ></TextInput>
        <Text style={Styles.label}>Password</Text>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword}   style={Styles.input}></TextInput>
        <Button title="Accedi" onPress={()=>{
            console.log(user,password);
            api.login(user,password)
                .then(data=>{
                    storeData(token,data.token);
                },error=>{
                    console.error(error);
                });
        }}></Button>
    </View>
}