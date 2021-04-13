import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const Details = ({ navigation }) => {
  const styles = StyleSheet.create({
    containerDetails: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.containerDetails}>
      <Text>Country: VARIABLE CON PAIS SELECCIONADO</Text>
      <Text>New Confirmed:</Text>
      <Text>Total Confirmed:</Text>
      <Text>New Death:</Text>
      <Text>Total Death:</Text>
      <Text>New Recovered:</Text>
      <Text>Total recovered:</Text><br></br>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <br></br>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Details;
