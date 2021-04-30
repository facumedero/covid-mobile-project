import React, { useState, useEffect } from "react";
import { Button, View, Image, StyleSheet, ActivityIndicator, Picker } from "react-native";
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
  const [errorValue, setErrorValue] = useState(null);

  useEffect(() => {
      loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setCountriesValue(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorValue(true);
        alert(
          "Something is wrong.Check your internet",
          [
            { onPress: () => navigation.navigate("Home") }
          ]
        );
      });
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
    modalDropdown: {
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      width: 200,
      backgroundColor: "#2196f3",
    }
  });

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );

  if(errorValue !== null){
    return (
      <View style={styles.container}>
        <Button
        title="Go to Argentina's data"
        onPress={() => navigation.navigate("Details", { name: "Argentina", code: "AR"})}
      />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ModalDropdown
        style={styles.modalDropdown}
        onSelect={(key, value) => navigation.navigate("Details", { name: value, code: countriesValue[key].ISO2}) }
        defaultValue={"SELECT COUNTRY HERE"}
        options={countriesToString}
     />
      <Image source={image} style={styles.image} />
      <Button
        title="Go to Argentina's data"
        onPress={() => navigation.navigate("Details", { name: "Argentina", code: "AR"})}
      />

      {
        (favCountryISOList !== null) && (
          <li> <Button
            title=" Countries Favorites"
            onPress={() => navigation.navigate("Favorites", { favCountries:favCountryISOList})}
          /></li>
        )
      }
    </View>
  );
};


export default Home;
