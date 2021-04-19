import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const Details = ({ navigation, route }) => {
  const styles = StyleSheet.create({
    containerDetails: {
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
    }
  });

  const { country } = route.params;

  return (
    <View style={styles.containerDetails}>
      <Text style={styles.text}>Country: { country }</Text>
      <Text style={styles.text}>New Confirmed:</Text>
      <Text style={styles.text}>Total Confirmed:</Text>
      <Text style={styles.text}>New Death:</Text>
      <Text style={styles.text}>Total Death:</Text>
      <Text style={styles.text} >New Recovered:</Text>
      <Text style={styles.text}>Total recovered:</Text><br></br>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <br></br>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Details;
