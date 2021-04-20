import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

const Favorites = ({ navigation, route }) => {
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
      }
    });

return (
    <View style={styles.containerDetails}>
      <Text style={styles.text}>My Favorites Country: </Text>
      <br></br>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <br></br>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Favorites;