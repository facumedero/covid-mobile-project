import React, { useState, useEffect } from "react";
import {useRecoilState} from 'recoil';
import { Button, View, Text, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {updateFavCountryISOFromStorage} from "../storage";
import {favCountryISOListState} from "../atoms/favCountryISOListState";
import { loadFavCountryISOListFromStorage } from "../storage";


const Details = ({ navigation, route }) => {
  const styles = StyleSheet.create({
    containerDetails: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000"
    },
    text: {
      color: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      fontSize: 20
    },
    favIconTouchableOpacity: {
      position: 'absolute',
      right: 20,
      top: 30
    },
  });

  const [loadingValue, setLoading] = useState(true);

  const [country, setCountry] = useState({
    name: route.params.name,
    code: route.params.code
  })

  const [today, setToday] = useState({ date: moment().format('YYYY-MM-DD T00:00:00Z')});
  const [yestarday, setYestarday] = useState({ date: moment().subtract(1, 'day').format('YYYY-MM-DD T00:00:00Z')});
  const [currentCountryFavStatus, setCountryFavStatus] = useState(false);
  const url = "https://api.covid19api.com/live/country/" + country.code + "?from=" + yestarday.date + "&to=" + today.date;
  //listado de  codigos ISO de paises Favoritos
  const [favCountryISOList, setFavCountryISOList] = useRecoilState(favCountryISOListState);
  useEffect(() => {
      loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setYestarday(res[0]);
        setToday(res[1])
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        alert("Verifique su conexión")
        //volver a home cuando no hay conexion
        //navigation.navigate("Home")
      });
  }, []);

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );

    const toggleCountryFavStatus = async () => {
      const newFavStatus = !currentCountryFavStatus;
      //verificar si el id "ISO2" se encuentra dentro de la lista de favoritos
      updateFavCountryISOFromStorage(country.code, newFavStatus).then( r => setFavCountryISOList(r));
      //ACA ESTA EL ERROR
      setCountryFavStatus(newFavStatus);
      //NO ESTA FUNCIONANDO EL SETEAR EL VALOR A TRUE, la variable currentCountryFavStatus
      //tendria que quedar con TRUE y sigue en false despues del set de arriba

  }

  return (
    <View style={styles.containerDetails}>
        <Text style={styles.text}>Country: { country.name } </Text>
        <TouchableOpacity onPress={toggleCountryFavStatus} style={styles.favIconTouchableOpacity}>
            <Icon
              name={ currentCountryFavStatus === false ? "star" : "star" }
              size={40}
              color={ currentCountryFavStatus === false ? "#FFF" : "#FF0" }
            />
        </TouchableOpacity>
        <Text style={styles.text}>New Confirmed: { today.Confirmed - yestarday.Confirmed } </Text>
        <Text style={styles.text}>Total Confirmed: { today.Confirmed } </Text>
        <Text style={styles.text}>New Death: { today.Deaths - yestarday.Deaths } </Text>
        <Text style={styles.text}>Total Death: { today.Deaths } </Text>
        <Text style={styles.text} >New Recovered: { today.Recovered -yestarday.Recovered } </Text>
        <Text style={styles.text}>Total recovered:{ today.Recovered } </Text>
        <Text>{"\n"}</Text>
        <Button title="Countries Favorites" onPress={() => navigation.navigate("Favorites", { favCountries:favCountryISOList})} />
        <Text>{"\n"}</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        <Text>{"\n"}</Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Details;
