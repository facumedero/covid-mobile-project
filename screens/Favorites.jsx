import React, { useState, useEffect,Component} from "react";
import { Button, View, Text, StyleSheet, FlatList } from "react-native";
import { loadFavCountryISOListFromStorage } from "../storage";

const Favorites = ({ navigation }) => {

    const [favCountryISOList, setFavCountryISOList] = useState([]);

    useEffect(() => {
      loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
  }, []);

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

    if ( favCountryISOList.length == 0 ) {
      return (
        <View style={styles.containerFavorites}>
          <Text style={styles.text}>You don't have favorites countries. </Text>
          <Button title="Home" onPress={() => navigation.navigate("Home")} />
        </View>
      );
    }
    return(
    <View style={styles.containerFavorites}>
      <Text style={styles.text}>My Favorites Countries: </Text>
      <Text>{"\n"}</Text>
      <Text style={styles.text}>
        {
            favCountryISOList.map((country) =>
              <li key={country.code}>
                  <Button title={ country.name } onPress={() => navigation.navigate("Details",{country})}/>
            </li>
            )
        }</Text>
      <Text>{"\n"}{"\n"}</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Text>{"\n"}</Text>
    </View>
  );
};

export default Favorites;