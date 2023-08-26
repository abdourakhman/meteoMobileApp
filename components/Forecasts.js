import { ScrollView, View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import Weather from './Weather';

export default function Forecasts( {data} ){
  const [forecasts, setForecasts] = useState(null);

  useEffect(()=>{
    const forecastsData = data.list.map(f => {
      const date = new Date(f.dt *1000);
      return ({
        date:date,
        hour:date.getHours(),
        temp:Math.round(f.main.temp),
        icon:f.weather[0].icon,
        day:format(date,'EEEE', {locale:fr})
      });
    })

    //Logique prévision par jour
    const newForecastsData = forecastsData.map( f => f.day).filter((value,index,self)=>{
      return self.indexOf(value) === index
    }).map(day => {
      return {
      day,
      data:forecastsData.filter((f)=>{
        return f.day === day;
      })
      }
    })
    setForecasts(newForecastsData);
  },[data]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {forecasts?.map(forecast => (
        <View>
          <Text style={styles.day}> {forecast.day} </Text>
          <View style={styles.container} > 
            {forecast.data.map(w => <Weather forecast = {w} />)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  day:{
    textAlign:"start",
    paddingTop:5,
    color:"gray",
    fontSize:24,
    fontWeight:"bold"
  },
  container:{
    flexDirection:'row',
    marginRight:5
  }
});