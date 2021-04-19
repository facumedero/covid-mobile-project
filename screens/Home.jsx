import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, StyleSheet } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import image from "../assets/covid.gif";

const Home = ({ navigation }) => {
  const [loadingValue, setLoading] = useState(true);
  const [countriesValue, setCountriesValue] = useState([]);
  const url = "https://api.covid19api.com/countries";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "black"
    },
    title: { fontSize: 20, color: "#fff" },
    image: { height: 200, width: 200 },
    button: {
      backgroundColor: "#a52a2a",
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
      color: "#a52a2a",
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

  const countriesToString = countriesValue.map((c) => { return c.Country})

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
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Loading information...</Text>
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
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};


export default Home;
