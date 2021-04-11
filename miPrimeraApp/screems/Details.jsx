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
      <Text>Detalles del pais seleccionado:</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Details;
