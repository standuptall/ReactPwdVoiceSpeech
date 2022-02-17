

import React from 'react';
import {  Text, View,StyleSheet } from 'react-native';

export function Header(props){
    return <View style={styles.header} >
        <Text style={{fontSize:20,fontWeight:"bold",color:"white"}}>{props.title}</Text>
    </View>
}

const styles = StyleSheet.create({
    
    header: {
        height: 100,
        backgroundColor: 'skyblue',
        textAlign:"center",
        alignItems:"center",
        display: "flex",
        paddingTop:40
        
    },
  });
  