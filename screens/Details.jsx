import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import moment from 'moment';

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

  const [loadingValue, setLoading] = useState(true);

  const [country, setCountry] = useState({
    name: route.params.name,
    code: route.params.code
  })

  const [today, setToday] = useState({ date: moment().format('YYYY-MM-DD T00:00:00Z')});
  const [yestarday, setYestarday] = useState({ date: moment().subtract(1, 'day').format('YYYY-MM-DD T00:00:00Z')});

  const url = "https://api.covid19api.com/live/country/" + country.code + "?from=" + yestarday.date + "&to=" + today.date

  useEffect(() => {
    // Algunas veces devuelve falso, vaya a saber dios saber por qué
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setYestarday(res[0]);
        setToday(res[1])
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
    <View style={styles.containerDetails}>
      <Text style={styles.text}>Country: { country.name } </Text>
      <Text style={styles.text}>New Confirmed: { today.Confirmed - yestarday.Confirmed } </Text>
      <Text style={styles.text}>Total Confirmed: { today.Confirmed } </Text>
      <Text style={styles.text}>New Death: { today.Deaths - yestarday.Deaths } </Text>
      <Text style={styles.text}>Total Death: { today.Deaths } </Text>
      <Text style={styles.text} >New Recovered: { today.Recovered -yestarday.Recovered } </Text>
      <Text style={styles.text}>Total recovered:{ today.Recovered } </Text><br></br>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <br></br>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
  );
};

export default Details;
