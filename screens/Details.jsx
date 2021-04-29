import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {updateFavCountryISOFromStorage, getStatusCountry} from "../storage";
import {EmailShareButton, LinkedinShareButton,TelegramShareButton,
        TwitterShareButton, WhatsappShareButton,EmailIcon,TwitterIcon, TelegramIcon,
        LinkedinIcon,WhatsappIcon,FacebookMessengerIcon,FacebookMessengerShareButton } from "react-share";

const Details = ({ navigation, route }) => {
  const styles = StyleSheet.create({
    containerDetails: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000"
    },
    text: {
      color: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      fontSize: 20
    },
    favIconTouchableOpacity: {
      position: 'absolute',
      right: 20,
      top: 30
    },
    IconsShareSocialMedia: {
      position: 'absolute',
      bottom: 30,
      left:530
    },
  });

  const [loadingValue, setLoading] = useState(true);

  const [country, setCountry] = useState({
    name: route.params.name,
    code: route.params.code
  })

  const [today, setToday] = useState({ date: moment().format('YYYY-MM-DD T00:00:00Z')});
  const [yestarday, setYestarday] = useState({ date: moment().subtract(1, 'day').format('YYYY-MM-DD T00:00:00Z')});
  const [currentCountryFavStatus, setCountryFavStatus] = useState(null);
  const url = "https://api.covid19api.com/live/country/" + country.code + "?from=" + yestarday.date + "&to=" + today.date;
  const shareUrl = url;
  const title = 'Country Data: '+ country.name;

  useEffect(() => {
      getStatusCountry(country).then( r => setCountryFavStatus(r));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setYestarday(res[0]);
        setToday(res[1])
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        alert("Check your internet connection.")
        //location("Home")
      });
  }, []);

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );

    const toggleCountryFavStatus = async () => {
      updateFavCountryISOFromStorage(country, currentCountryFavStatus).then(setCountryFavStatus(!currentCountryFavStatus));
    }

  return (
    <View style={styles.containerDetails}>
        <Text style={styles.text}>Country: { country.name } </Text>
        {
          (currentCountryFavStatus !== null ) && (
          <TouchableOpacity onPress={toggleCountryFavStatus} style={styles.favIconTouchableOpacity}>
              <Icon
                name={ currentCountryFavStatus === false ? "star" : "star" }
                size={40}
                color={ currentCountryFavStatus === false ? "#FFF" : "#FF0" }
              />
          </TouchableOpacity>
          )
        }
        <Text style={styles.text}>New Confirmed: { today.Confirmed - yestarday.Confirmed } </Text>
        <Text style={styles.text}>Total Confirmed: { today.Confirmed } </Text>
        <Text style={styles.text}>New Death: { today.Deaths - yestarday.Deaths } </Text>
        <Text style={styles.text}>Total Death: { today.Deaths } </Text>
        <Text style={styles.text} >New Recovered: { today.Recovered -yestarday.Recovered } </Text>
        <Text style={styles.text}>Total recovered:{ today.Recovered } </Text>
        <Text>{"\n"}</Text>

        <Button title="Countries Favorites" onPress={() => navigation.navigate("Favorites")} />
        <Text>{"\n"}</Text>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
        <Text>{"\n"}</Text>
        <View style={styles.containerDetails}>

          <TouchableOpacity style={styles.IconsShareSocialMedia}>

            <TwitterShareButton url={shareUrl} title={title} >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookMessengerShareButton url={shareUrl} appId="521270401588372" >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>

            <WhatsappShareButton url={shareUrl} title={title} separator=" " >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>

            <LinkedinShareButton url={shareUrl} >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <EmailShareButton url={shareUrl} subject={title} body="body">
              <EmailIcon size={32} round />
            </EmailShareButton>

          </TouchableOpacity>

        </View>
      </View>
  );
};

export default Details;
