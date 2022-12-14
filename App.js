import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Pressable } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getPreciseDistance';


export default function App() {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState(0);  

  //Käyttäjä voi ikonilla asettaa nykyiseen sijaintiin kartan
  //Käyttäjä voi napilla laskea etäisyyden markkerin ja oman sijainnin välillä

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

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 65,
            longitude: 20,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5          
          }}
          onRegionChange={region => console.log(region)}
        >
          <Marker
            draggable
            coordinate={{latitude: 65, longitude: 20}}
            title={'My location'}
            description={'Heres a party!'}
          />
        </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: Dimensions.get('window').width,
    height: '100%'
  }
});
