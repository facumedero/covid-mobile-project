import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import image from "../assets/covid.gif";
import { favCountryISOListState } from "../atoms/favCountryISOListState";
import { loadFavCountryISOListFromStorage } from "../storage";
import {useRecoilState} from 'recoil';

const Home = ({ navigation }) => {
  const [loadingValue, setLoading] = useState(true);
  const [countriesValue, setCountriesValue] = useState([]);
  const url = "https://api.covid19api.com/countries";
  const countriesToString = countriesValue.map((c) => { return c.Country})
  const [favCountryISOList, setFavCountryISOList] = useRecoilState(favCountryISOListState);
  useEffect(() => {
      loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#000"
    },
    title: {
      fontSize: 20,
      color: "#fff"
    },
    image: {
      height: 250,
      width: 250
    },
    button: {
      padding: 7,
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 20,
    },
    modalDropdown: {
      alignItems: "center",
      justifyContent: "center",
      height: 70,
      width: 100,
      backgroundColor: "blue"
    },
    text: {
      color: "#fff",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    }
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setCountriesValue(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        alert("Verifique su conexión")
      });
  }, []);

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COVID-19 information:</Text>
      <ModalDropdown
        style={styles.modalDropdown}
        onSelect={(key, value) => navigation.navigate("Details", { name: value, code: countriesValue[key].ISO2}) }
        defaultValue={"Select Country"}
        options={countriesToString}
     />
      <Image source={image} style={styles.image} />
      <Button
        title="Go to Argentina's data"
        onPress={() => navigation.navigate("Details", { name: "Argentina", code: "AR"})}
      />
      <Text>{"\n"}</Text>
      {
        (favCountryISOList !== null) && (
          <Button
            title=" Countries Favorites"
            onPress={() => navigation.navigate("Favorites", { favCountries:favCountryISOList})}
          />
        )
      }
    </View>
  );
};


export default Home;
