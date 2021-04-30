import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native";
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
      backgroundColor: "#000",
      flexDirection: 'column',
      justifyContent: 'center',
      padding:10
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
  const [yesterday, setyesterday] = useState({ date: moment().subtract(1, 'day').format('YYYY-MM-DD T00:00:00Z')});
  const [currentCountryFavStatus, setCountryFavStatus] = useState(null);
  const url = "https://api.covid19api.com/live/country/" + route.params.code + "?from=" + yesterday.date + "&to=" + today.date;
  const shareUrl = url;
  const title = 'Country Data: '+ country.name;
  const [errorValue, setErrorValue] = useState(null);

  const toggleCountryFavStatus = async () => {
    updateFavCountryISOFromStorage(country, currentCountryFavStatus).then(setCountryFavStatus(!currentCountryFavStatus));
  }

  useEffect(() => {
      getStatusCountry(country).then( r => setCountryFavStatus(r));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setyesterday(res[0]);
        setToday(res[1]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        alert(
          "Something is wrong.Check your internet connection",
            { onPress: () => navigation.navigate("Home") }
        );
      });
  }, []);

  if (loadingValue)
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={styles.containerDetails}>
        <Button title={"Country: "+(route.params.name)}> </Button>
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
        <li><Button title={"New Confirmed:" + (today.Confirmed - yesterday.Confirmed)} > </Button></li>
        <li><Button title={"Total Confirmed: "+ (today.Confirmed) }> </Button></li>
        <li><Button title={"New Death: " + (today.Deaths - yesterday.Deaths)  }></Button></li>
        <li><Button title={"Total Death: " + (today.Deaths )}> </Button></li>
        <li><Button title={"New Recovered: "+( today.Recovered -yesterday.Recovered)} > </Button></li>
        <li><Button title={"Total recovered: " +(today.Recovered)}></Button></li>


        <li><Button title="Countries Favorites" onPress={() => navigation.navigate("Favorites")} /></li>
        <li><Button title="Home" onPress={() => navigation.navigate("Home")} /></li>
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
