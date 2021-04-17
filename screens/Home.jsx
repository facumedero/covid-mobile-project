import React, { useState, useEffect } from "react";
import { Button, View, Text, Image, Picker, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import image from "../assets/covid.gif";

const Home = ({ navigation }) => {
  const [loadingValue, setLoading] = useState(true);
  const [countriesValue, setCountriesValue] = useState([]);
  const url = "https://api.covid19api.com/countries";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "black",
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
    piker: {
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: 200,
      color: "#292929",
      backgroundColor: "#fff",
    },
    text: {
      color: "#fff",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 50,
    },
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setCountriesValue(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Loading ...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COVID-19 information:</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Select the desired Countries:</Text>
      <Picker
        style={styles.piker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {countriesValue.map((item) => (
          <Picker.Item label={item.Country} value={item.Country} />
        ))}
      </Picker>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

export default Home;
