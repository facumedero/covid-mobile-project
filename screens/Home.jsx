import React, { useState } from "react";
import { Button, View, Text, Image, Picker, StyleSheet } from "react-native";
import image from "../assets/covid.gif";

const Home = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COVID-19 information:</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>Select the desired country:</Text>
      <Picker
        style={styles.piker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="Afganistan" value="Afganistan" />
        <Picker.Item label="Brasil" value="Brasil" />
      </Picker>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

export default Home;
