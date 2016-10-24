const cities = () => { 
	return ( arrCities, search ) => {
		const textCity = search.cities || '';
		const textCountry = search.id || '';

		let result = [];
		arrCities.forEach( ( item ) => {
			if ( item.cities.toLowerCase().indexOf( textCity.toLowerCase() ) !== -1
				&& item.id.toLowerCase().indexOf( textCountry.toLowerCase() ) !== -1) {
					result.push(item);
				}
		})
		return result;
	}
}

export default cities;
