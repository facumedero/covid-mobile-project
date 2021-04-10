import React, {useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity,StyleSheet, Image ,Picker} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import image from './assets/virus.jpg';

function HomeScreen({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("Argentina");
  return (
    <View style={ styles.container}>
      <Text style={styles.title}> Información actualizada sobre COVID-19:</Text>
      <Image 
        source={image}
        style={styles.image}
      />
      <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 50 }}> Seleccione el pais deseado:</Text>
      
        <Picker
          selectedValue={selectedValue}
          style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Argentina" value="Argentina" />
          <Picker.Item label="Afganistan" value="Afganistan" />
          <Picker.Item label="Brasil" value="Brasil" />
          
        </Picker>
     
      <Button
        title="Ir a otra Pagina"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalles del pais seleccionado:</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#292929",
  },
  title: {fontSize: 20, color:"#fff"},
  image: {height:200, width:200, borderRadius:100},
  button:{
    backgroundColor:"#a52a2a",
    padding: 7,
    marginTop:10,
  },
    buttonText:{
      color:"#fff",
      fontSize: 20,
    },
});

export default App;
