import React,{useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Favorites from "./screens/Favorites";

const Stack = createStackNavigator();

export default function Dashboard(){
    return (
        <>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Details" component={Details} />
                            <Stack.Screen name="Favorites" component={Favorites} />
                        </Stack.Navigator>
                    </NavigationContainer>
        </>
    );
}