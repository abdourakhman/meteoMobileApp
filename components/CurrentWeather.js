import { Text, View, StyleSheet , Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {isSameDay} from 'date-fns';

export default function CurrentWeather({data}){
  const [currentWeather, setWeather] = useState(null);
  const getIcon =(icon)=> `http://openweathermap.org/img/wn/${icon}@4x.png`;
  useEffect(()=>{
    currentW = data.list.filter(weather =>{
      let today = new Date().getTime() + Math.abs(data?.city.timezone *1000);
      const forecastDay = new Date(weather.dt *1000);
      return isSameDay(today,forecastDay);
    })
    setWeather(currentW[0]);
  },[data])
  return (
    <View style={styles.container}>
        <Text style={styles.city}>{data?.city?.name}</Text>
        <Text style={styles.today}>Aujourd'hui</Text>
        <Image style={styles.icon} source={{uri: getIcon(currentWeather?.weather[0]?.icon)}}  />
        <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C </Text>
        <Text style={styles.description}>{currentWeather?.weather[0]?.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:2,
    alignItems:"center",
  },
  city:{
    color:"white",
    fontWeight:"bold",
    marginBottom:32,
    fontSize:32
  },
  today:{
    color:"white",
    fontSize:30
  },
   description:{
    color:"black",
    fontSize:20,
  },
   temp:{
    fontWeight:"bold",
    color:"white",
    fontSize:40
  },
  icon:{
    width:250,
    height:200
  }
})