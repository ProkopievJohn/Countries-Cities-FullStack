import { combineReducers } from 'redux'

import { countries } from './countries';
import { cities } from './cities';
import { user } from './user';

// console.log(countries)


// export default combineReducers(cities, countries);
export default combineReducers({
    countries,
    cities,
    user,
});
