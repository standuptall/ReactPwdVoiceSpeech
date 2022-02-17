

import React from 'react';
import {  Text, View,StyleSheet, TouchableOpacity } from 'react-native';

export function ListItem(props){
    return     <TouchableOpacity onPress={()=>{
            props.navigation.navigate(props.context,{id:props.id,item:props.item});
        }}>
        <View style={styles.container}    >
            <Text style={{fontSize:18,fontWeight:"bold"}}>{props.name}</Text>
            <Text style={{textAlign:"right"}}>{props.description}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
      marginTop:0,
      padding:10,
      borderBottomColor:"gray",
      borderBottomWidth:1,
    },
  });
  