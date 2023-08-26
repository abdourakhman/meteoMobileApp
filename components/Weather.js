import {View, Text, StyleSheet, Image,} from 'react-native';

export default function Weather( {forecast} ){
  const getIcon =(icon)=> `http://openweathermap.org/img/wn/${icon}@2x.png`;
  
  return(
    <View style={styles.container}>
      <Text style={styles.hour}> {forecast.hour}h </Text>
      <Image style={styles.icon} source={{uri: getIcon(forecast.icon)}}  />
      <Text style={styles.temp}> {forecast.temp}°C</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:"#58137c",
    marginRight:10,
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    width:90,
    height:170,
    borderRadius:50
  },
  hour:{
    paddingTop:5,
    color:"white",
    fontSize:18
  },
   temp:{
    fontWeight:"bold",
    color:"orange",
    fontSize:20
  },
  icon:{
    width:120,
    height:100
  }
})