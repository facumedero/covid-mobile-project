import React, { useState, useEffect,Component} from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";
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
        backgroundColor: "#000"
      },
      text: {
        color: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        fontSize: 20
      },
      head: {
        height: 40,
        backgroundColor: '#808B97'
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
      <Text style={styles.text}>{"Codigos ISO2 de los paises favoritos:"}</Text>
      <Text style={styles.text}>{favCountryISOList.favCountries.map(
        (country) => <li> {country }</li> )}
      </Text>
       <Text>{"\n"}{"\n"}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>{"\n"}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Favorites;