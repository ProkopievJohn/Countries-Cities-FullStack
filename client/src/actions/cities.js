export const show = ( arrCities ) => {
	return ( dispatch ) => {
        const show = ( data ) => {
            return {
                type: 'SHOW_CITIES',
                payload: data,
            }
        };
        
		dispatch( show( arrCities ) );
	}
}

export const load = ( arrCities ) => {
    return ( dispatch ) => {
        const loaded = ( data ) => {
            return {
                type: 'LOADED_CITIES',
                payload: data,
            }
        }

        dispatch( loaded( arrCities ) );
        dispatch( show( arrCities ) )
    }
}

export const select = ( nameCityAndCountry ) => {
	const selectCity = ( data ) => {
		return {
			type: 'SELECT_CITY',
			payload: data,
		}
	}

	return (dispatch) => {
		dispatch( selectCity( nameCityAndCountry ) )
	}
}