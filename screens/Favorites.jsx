import React, { useState, useEffect,Component} from "react";
import { Button, View, StyleSheet, FlatList } from "react-native";
import { loadFavCountryISOListFromStorage } from "../storage";

const Favorites = ({ navigation }) => {

    const [favCountryISOList, setFavCountryISOList] = useState([]);

    useEffect( () => {
      loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
  }, []);

    const styles = StyleSheet.create({
      containerFavorites: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000"
      },
      head: {
        height: 40,
        backgroundColor: '#808B97'
      }
    });

    if ( favCountryISOList.length == 0 ) {
      return (
        <View style={styles.containerFavorites}>
          <li><Button title={"You don't have favorites countries"}> </Button></li>
          <Button title="Home" onPress={() => navigation.navigate("Home")}></Button>
        </View>
      );
    }
    return(
    <View style={styles.containerFavorites}>
        {
            favCountryISOList.map((country) =>
              <li key={country.code}>
                  <Button title={ country.name } onPress={() => { navigation.navigate("Details",
                    { name: country.name ,code: country.code}) }}>
                  </Button>
            </li>
            )
        }

<li><Button title="Home" onPress={() => navigation.navigate("Home")}></Button></li>

    </View>
  );
};

export default Favorites;