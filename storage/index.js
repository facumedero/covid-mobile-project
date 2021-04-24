import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFavCountryISOListFromStorage = async () => {
    const favCountrysJSONStr = await AsyncStorage.getItem('@favCountrysJSON');
    const favCountrysJSON = JSON.parse(favCountrysJSONStr);
    if (favCountrysJSON !== null && favCountrysJSON['ids']) {
        return favCountrysJSON['ids'];
    }
    return [];
};

export const updateFavCountryISOFromStorage = async (countryISO, newFavStatus) => {
    const favCountrysJSONStr = await AsyncStorage.getItem('@favCountrysJSON');
    let favCountrysJSON = JSON.parse(favCountrysJSONStr);
    if (favCountrysJSON === null) {
        favCountrysJSON = {
            ids: []
        };
    }

    if (newFavStatus) {
        favCountrysJSON.ids.push(countryISO);
    } else {
        favCountrysJSON.ids = favCountrysJSON.ids.filter((value) => { return value !== countryISO});
    }
    await AsyncStorage.setItem('@favCountrysJSON', JSON.stringify(favCountrysJSON), ()=>{});
    return favCountrysJSON.ids;
}