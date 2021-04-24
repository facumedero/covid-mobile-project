import React,{useEffect} from "react";
import {useRecoilState} from 'recoil';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Details from "./screens/Details";
import Favorites from "./screens/Favorites";
import {favCountryISOListState} from "./atoms/favCountryISOListState";
import {loadFavCountryISOListFromStorage} from "./storage";

const Stack = createStackNavigator();

export default function Dashboard(){
    const [favCountryISOList, setFavCountryISOList] = useRecoilState(favCountryISOListState);
    useEffect(() => {
        loadFavCountryISOListFromStorage().then( r => setFavCountryISOList(r));
    }, []);

    return (
        <>
            {
                (favCountryISOList !== null) && (
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Details" component={Details} />
                            <Stack.Screen name="Favorites" component={Favorites} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )
            }
        </>
    );
}