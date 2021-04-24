import React, { useState, useEffect,Component} from "react";
import { Button, View, Text, StyleSheet,TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateFavCountryIdFromStorage} from "../storage";

const Favorites = ({ navigation, route }) => {
    //const [favCountryIdList, setFavCountryIdList] = (favCountryIdListState);
    const [currentCountryUrl, setCountryUrl] = useState(null);
    //estado que indica si el pais es favorito o no
    const [currentCountryFavStatus, setCountryFavStatus] = useState(false);

    const styles = StyleSheet.create({
      containerFavorites: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "#a52a2a"
      },
      text: {
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        padding: 10
      },
      favIconTouchableOpacity: {
        position: 'absolute',
        right: 20,
        top: 40
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
      //updateFavCountryIdFromStorage(getCountryIdFromUrl(currentCountryUrl), newFavStatus).then( r => setFavCountryIdList(r));
      setCountryFavStatus(newFavStatus);
  }


return (
    <View style={styles.containerDetails}>
      <Text style={styles.text}>My Favorites Countries: </Text>
      <Text>{"\n"}</Text>
       <TouchableOpacity onPress={toggleCountryFavStatus} style={styles.favIconTouchableOpacity}>
          <Icon
            name={ currentCountryFavStatus === false ? "heart-o" : "heart" }
            size={30}
            color={ currentCountryFavStatus === false ? "#000" : "#F00" }
          />
       </TouchableOpacity>
       <Text>{"\n"}{"\n"}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Text>{"\n"}</Text>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Favorites;