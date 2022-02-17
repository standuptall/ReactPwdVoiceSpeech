import React, { useEffect, useState } from 'react';
import { Alert, Button,Image,ScrollView,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../services/api';
import { ListItem } from '../components/ListItem';
import { Icon } from 'react-native-elements'




export function HomeScreen(props){
    const [p,setP] = useState([]);
    
    const launchCommand = (command)=>{
      switch (command) {
        case "key" : break;
        case "voice" : props.navigation.navigate("Voice",{}); break;
        case "add" : break;
        case "fuel" : props.navigation.navigate("Rifornimenti",{});break;
      }
    };
    
    useEffect(()=>{
      api.getPasswords("").then(
        (data)=>{
          setP(data);
        },error=>{
          console.error(error);
          props.navigation.push("Login",{});
      })
    },[])
    return  <View style={styles.containerbig}>
      
              <ScrollView style={styles.container}>
                {p.map((item)=>(
                    // <Text>{item.nome}</Text>
                    <ListItem name={item.nome} description={item.nomeutente} id={item.ID} key={item.ID} navigation={props.navigation} item={item} context="Password"></ListItem>
                ))}
              </ScrollView>
              <View style={styles.commandPalette}>
                  <TouchableOpacity onPress={()=>launchCommand("key")}  title="SET KEY"><Image source={require('../assets/3099849.png')} style={{width:70,height:70}}></Image></TouchableOpacity>
                  <TouchableOpacity onPress={()=>launchCommand("voice")}  title="VOICE"><Image source={require('../assets/3831308.png')} style={{width:70,height:70}}></Image></TouchableOpacity>
                  <TouchableOpacity onPress={()=>launchCommand("add")} title="ADD"><Image source={require('../assets/plus.png')} style={{width:70,height:70}}></Image></TouchableOpacity>
                  <TouchableOpacity onPress={()=>launchCommand("fuel")} title="FUEL"><Image source={require('../assets/223394.png')} style={{width:70,height:70}}></Image></TouchableOpacity>
              </View>
            </View>
}



const styles = StyleSheet.create({
  containerbig:{
    height:"100%",
    flex:1,
    flexDirection:"column"
  },
  container: {
    backgroundColor: '#fff',
    height:"40%"
  },commandPalette: {
    flexDirection:"row",
    backgroundColor: '#fff',
    height:"15%"
  },
  button:{
    fontSize:20,
    margin:10,
    // border:"1px gray solid",
    padding:20,
    borderRadius:40,
    backgroundColor:"gray"
  }
});
