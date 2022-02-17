import React, { useEffect, useState } from 'react';
import { Alert, Button,ScrollView,StyleSheet, Text, View ,TextInput} from 'react-native';
import {Styles} from '../components/Styles'
import {api} from '../services/api'

export function RifornimentoScreen(props){

    const [importo,setImporto] = useState(props.route.params.item.importo);
    const [tachimetro,setTachimetro] = useState(props.route.params.item.tachimetro);
    const [costo,setCosto] = useState(props.route.params.item.costo);
    const [residuo,setResiduo] = useState(props.route.params.item.residuo);
    const [data,setData] = useState(props.route.params.item.data);

    return <ScrollView>
        <Text style={Styles.label}>Data</Text>
        <TextInput style={Styles.input} value={data} onChangeText={setData}></TextInput>
        <Text style={Styles.label}>Importo</Text>
        <TextInput style={Styles.input} value={importo} onChangeText={setImporto}></TextInput>
        <Text style={Styles.label}>Tachimetro</Text>
        <TextInput style={Styles.input} value={tachimetro} onChangeText={setTachimetro}></TextInput>
        <Text style={Styles.label}>Costo</Text>
        <TextInput style={Styles.input} value={costo} onChangeText={setCosto}></TextInput>
        <Text style={Styles.label}>Residuo</Text>
        <TextInput style={Styles.input} value={residuo} onChangeText={setResiduo}></TextInput>
        
        <Button title="Salva" onPress={()=>{
            api.updateRifornimento({data,importo,tachimetro,costo,residuo})
        }}>Salva</Button>
    </ScrollView>
}