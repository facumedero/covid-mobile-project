import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screen/Home";
import Details from "./screen/Details";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      country:[],
      url:'https://api.covid19api.com/dayone/country/south-africa/status/confirmed'
    }
  }
  

  componentDidMount(){
    this.getCountry();
  }
  getCountry = () =>{
    //consulta con todos los paises formato:
    // {
    //  "Country": "Canada",
    //  "Slug": "canada",
    //  "ISO2": "CA"
    // },
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://api.covid19api.com/countries", requestOptions)
      .then(response => response.text())
      .then(result =>console.log(result))
      .catch(error => console.log('error', error))
  
    
    
    //this.setState({loading:true})
    //console.log(fetch(this.state.url))

  }

  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}

export default App;
