import AsyncStorage from '@react-native-async-storage/async-storage';
import { favCountryISOListState } from '../atoms/favCountryISOListState';

export const loadFavCountryISOListFromStorage = async () => {
    const favCountriesJSONStr = await AsyncStorage.getItem('@favCountriesJSON');
    const favCountriesJSON = JSON.parse(favCountriesJSONStr);
    if (favCountriesJSON !== null && favCountriesJSON['ids']) {
        return favCountriesJSON['ids'];
    }
    return [];
};

export const updateFavCountryISOFromStorage = async (country, newFavStatus) => {
    const favCountriesJSONStr = await AsyncStorage.getItem('@favCountriesJSON');
    let favCountriesJSON = JSON.parse(favCountriesJSONStr);
    if (favCountriesJSON === null) {
        favCountriesJSON = {
            ids: []
        };
    }

    if (!newFavStatus) {
        favCountriesJSON.ids.push(country);
    } else {
        //falla aca, no se puede comparar arreglos con el filter
        favCountriesJSON.ids = favCountriesJSON.ids.filter((value) => {return value !== country} );
    }
    await AsyncStorage.setItem('@favCountriesJSON', JSON.stringify(favCountriesJSON), ()=>{});
    return favCountriesJSON.ids;
}

export const getStatusCountry = async (country) => {
    const favCountriesJSONStr = await AsyncStorage.getItem('@favCountriesJSON');
    let favCountriesJSON = JSON.parse(favCountriesJSONStr);
    if (favCountriesJSON === null) {
        return false
    }
    return favCountriesJSON.ids.some((e) => e.code == country.code);
}