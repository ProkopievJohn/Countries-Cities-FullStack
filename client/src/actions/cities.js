export const showCities = ( arrCities ) => {
	return ( dispatch ) => {
        const showCities = ( data ) => {
            return {
                type: 'SHOW_CITIES',
                payload: data,
            }
        };
		dispatch(showCities( arrCities ));
	}
}