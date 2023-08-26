import { Text, View, StyleSheet , ActivityIndicator, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecasts from './components/Forecasts';

export default function App(){
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const ApiURL = (lat, lon) => `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=456f620603562a83d989d2da0a7cea0b&units=metric&lang=fr`;

  useEffect(
    ()=>{
      (async () =>{
        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          return;
        }

        await Location.getCurrentPositionAsync()
        .then((location) =>  getWeather(location))
        .catch((error) => setErrorMsg(error))
        
        }
      )();
    },[]
  );

  const getWeather = async (location) =>{
    try{
    let response = await axios.get(ApiURL(location.coords.latitude, location.coords.longitude));
    setData(response.data); 
    setLoading(false);
    }catch(e){console.log(e)}
  }

  if(loading){
    return(
      <View style={styles.container}>
       <ActivityIndicator />
       <Text style={styles.error}>Try to run this app on "https://snack.expo.dev"</Text>
      </View>
    )
  }else if (!errorMsg){
    return(
      <ImageBackground source={{uri:"https://i.pinimg.com/474x/d9/59/f9/d959f9263fa674b600b2aba2271714e1.jpg"}} resizeMode='cover' style={styles.container}>
      
        <CurrentWeather data = {data} />
        <Forecasts data = {data}/>
      </ImageBackground>
    )
  }
    else{
      <View style={styles.container}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:"15%",
    alignItems:"center",
    height:"100%"
  },
  error:{
    color:"red",
    fontSize:20,
    marginTop:5
  },
})