import React, { useEffect, useState } from 'react';
import { Alert, Button,ScrollView,StyleSheet, Text, View ,TextInput} from 'react-native';
import {Styles} from '../components/Styles'
import base64 from 'react-native-base64'

var aesjs = require('aes-js');

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export function PasswordScreen(props){
    function _base64ToArrayBuffer(base64s) {
        var binary_string = base64.decode(base64s);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }
    const [decryptedBytes,setDecryptedBytes] = useState("");
    useEffect(()=>{
        var key = aesjs.utils.utf8.toBytes("KrTrA&kus34ses19");
        var iv = _base64ToArrayBuffer(props.route.params.item.IV);
        var bvytep = _base64ToArrayBuffer(props.route.params.item.password);
        console.log(key,iv);
        var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 8);
        var res = aesCfb.decrypt(bvytep);
        var ss = String.fromCharCode.apply(null, new Uint16Array(res));

        setDecryptedBytes(ss);

    },[]);
    console.log(props.route.params.item);
    return <View>
        <Text style={Styles.label}>Nome</Text>
        <TextInput style={Styles.input} value={props.route.params.item.nome}></TextInput>
        <Text style={Styles.label}>Descrizione</Text>
        <TextInput style={Styles.input} value={props.route.params.item.descrizione}></TextInput>
        <Text style={Styles.label}>Nome utente</Text>
        <TextInput style={Styles.input} value={props.route.params.item.nomeutente}></TextInput>
        <Text style={Styles.label}>Password</Text>
        <TextInput style={Styles.input} value={decryptedBytes}></TextInput>
    </View>
}