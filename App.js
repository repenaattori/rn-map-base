import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Pressable } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';


export default function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    getLocation();
  },[]);

  const getLocation = async() =>{
      setIsLoading(true);
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setIsLoading(false);
        console.log("Geolocation failed");
        return;
      }
      const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Lowest});
   
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsLoading(false);
    };

    if(isLoading){
      return;
    }

  const calcDistance = ()=>{
    const calcDist = getDistance(
          {latitude:64.97425289540878, longitude: 25.60354793332854},
          {latitude:latitude, longitude: longitude}, 
        )
    setDistance( calcDist );
  }

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
