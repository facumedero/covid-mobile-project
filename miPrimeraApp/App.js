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
      url:'https://api.covid19api.com/countries'
    }
  }
  

  componentDidMount(){
    fetch("https://api.covid19api.com/countries")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            country: result.country
          });
        },
        
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .then(console.log(fetch("https://api.covid19api.com/countries").then(res => res.json())))
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
      );
    }
  }
}
  


export default App;
