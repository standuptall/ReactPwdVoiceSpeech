import React, { useEffect, useState } from 'react';
import { Alert, Button,ScrollView,StyleSheet, Text, View ,TextInput} from 'react-native';
import {api} from '../services/api'
import { ListItem } from '../components/ListItem';

export function RifornimentiScreen(props){
    const [rifornimenti,setRifornimenti] = useState([]);
    useEffect(()=>{
        api.getRifornimenti()
            .then(data=>{
                console.log(data);
                setRifornimenti(data);
            },error=>{

            });
    },[]);
    return <ScrollView >
    {rifornimenti.map((item)=>(
        // <Text>{item.nome}</Text>
        <ListItem name={item.ID +'->'+ item.data} description={item.tachimetro +'Km '+ item.importo + "€"} id={item.ID} key={item.ID} navigation={props.navigation} item={item}  context="Rifornimento"></ListItem>
    ))}
  </ScrollView>
}


// {"ID": "211", "costo": "1.585", "data": "2021-07-05", "datains": "2021-07-05 07:01:37", "idutente": "4", "importo": "40.00", "litri": "25.236593059937", "primo": "0", "residuo": "19", "stato": "", "tachimetro": "7707", "ultimo": "0"}