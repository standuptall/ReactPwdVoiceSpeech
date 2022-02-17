import React,{useEffect,useState} from "react";
import {  Button,PermissionsAndroid,StyleSheet,Text,View } from "react-native";
import Voice from 'react-native-voice';
import {Styles} from '../components/Styles'
import {api} from '../services/api'


export function VoiceScreen(props){
    const [recognized,setRecognized] = useState("");
    const [started,setStarted] = useState("");
    const [results,setResults] = useState([]);
    const [listening,setListening] = useState(false);

    const [importo,setImporto] = useState(0);
    const [tachimetro,setTachimetro] = useState(0);
    const [costo,setCosto] = useState(0);
    const [residuo,setResiduo] = useState(0);

    
    const [frase,setFrase] = useState("");
    async function requestCameraPermission() {
        try 
        {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Microphone permission",
                message:
                    "Per riconoscere comandi vocali",
                buttonNeutral: "Dopo",
                buttonNegative: "Annulla",
                buttonPositive: "OK"
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } 
        catch (err) {
            console.warn(err);
        }
    }
    useEffect(()=>{
        //requestCameraPermission();
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
    },[])

    


   
    function onSpeechStart(e){
        console.log(e);
        setStarted('iniziato');
    }
    function onSpeechRecognized(e){
        console.log(e);
        setRecognized('iniziato');
        
    }
    function onSpeechPartialResults(e){
        console.log(e.value);
    }
    function onSpeechResults(e){
        console.log(e.value);
        let frase = e.value[0];
        const parole = frase.split(" ");
        for(let i=0;i<parole.length;i++)
        {
            const chiave = parole[i];
            console.log(chiave);
            if (chiave === "importo")
                setImporto(parole[i+1]);
            if (chiave === "tachimetro")
                setTachimetro(parole[i+1]);
            if (chiave === "costo")
                setCosto(parole[i+1]);
            if (chiave === "residuo")
                setResiduo(parole[i+1]);
        }
        _startRecognition();
        showSituation();
    }
    async function _startRecognition(e) {
        setListening(true);
        setRecognized('');
        setStarted('');
        setResults([]);
        try {
            await Voice.start('it-IT');
        } catch (e) {
            console.error(e);
        }
    }
    function showSituation(){
        setFrase(`Perfetto! Faccio un rifornimento di  ${importo}€  col tachimetro auto ${tachimetro}, un costo di ${costo} €/l  e un residuo di ${residuo} Km!`);
    }
    function save(){
        const data = JSON.stringify(new Date()).replace(/\"/g,'').substring(0,10);
        const obj = {data,importo,tachimetro,costo,residuo};
        api.saveRifornimento(obj)
            .then(data=>{
                console.log(data);
                props.navigation.navigate("Rifornimenti",{});
            },error=>{
                console.error(error);
            });

    }
    return (
        <View>
        {results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
        )}
        <Button disabled={listening} style={styles.transcript}
            onPress={_startRecognition}
            title="Start"></Button>
        <Button disabled={!listening} style={styles.transcript}
            onPress={()=>{setListening(false)}}
            title="Stop"></Button>
        
        <View><Text style={Styles.label}>Importo</Text><Text style={Styles.label}>{importo}</Text></View>
        <View><Text style={Styles.label}>Tachimetro</Text><Text style={Styles.label}>{tachimetro}</Text></View>  
        <View><Text style={Styles.label}>Costo</Text><Text style={Styles.label}>{costo}</Text></View>
        <View><Text style={Styles.label}>Residuo</Text><Text style={Styles.label}>{residuo}</Text></View>
        
        <Button  style={styles.transcript}
            onPress={save}
            title="Salva"></Button>
        </View>
    );
}
const styles = StyleSheet.create({
    transcript: {
      textAlign: 'center',
      color: '#B0171F',
      marginBottom: 1,
      top: '400%',
    },
  });




