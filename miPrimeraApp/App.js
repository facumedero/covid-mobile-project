import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screems/Home";
import Details from "./screems/Details";

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
    //this.setState({loading:true})
    //fetch(this.state.url)

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
