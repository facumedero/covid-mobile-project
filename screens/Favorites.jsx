import React, { useState, useEffect,Component} from "react";
import { Button, View, Text, StyleSheet,TouchableOpacity, Alert } from "react-native";
import {updateFavCountryISOFromStorage} from "../storage";
import {useRecoilState} from 'recoil';
import {favCountryISOListState} from "../atoms/favCountryISOListState";

const Favorites = ({ navigation, route }) => {
    //list of favorites countries
    const [favCountryISOList, setFavCountryISOList] = useState({
      favCountries: route.params.favCountries,
    });
    // state that indicates if the country is favorite
    const [currentCountryFavStatus, setCountryFavStatus] = useState(false);

    const styles = StyleSheet.create({
      containerFavorites: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
      },
      container: {
         flex: 1,
         padding: 16,
         paddingTop: 30,
         backgroundColor: '#fff'
      },
      head: {
        height: 40,
        backgroundColor: '#808B97'
      },
      text: {
         margin: 6
      },
      row: {
        flexDirection: 'row',
        backgroundColor: '#FFF1C1'
      },
      btn: {
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
      },
      btnText: {
        textAlign: 'center',
        color: '#fff'
      }
    });

  const toggleCountryFavStatus = async () => {
      const newFavStatus = !currentCountryFavStatus;
      //verificar si el id "ISO2" se encuentra dentro de la lista de favoritos
      updateFavCountryISOFromStorage(country.code, newFavStatus).then( r => setFavCountryISOList(r),console.log("valor de r:"+r));
      setCountryFavStatus(newFavStatus);
  }

return (
    <View style={styles.containerFavorites}>
      <Text style={styles.text}>My Favorites Countries: </Text>
      <Text>{"\n"}</Text>
      <Text style={styles.text}>{"Estos son todos los codigos ISO de los paises favoritos:"}</Text>
      <Text style={styles.text}>{favCountryISOList.favCountries}</Text>
       <Text>{"\n"}{"\n"}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>{"\n"}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Favorites;