const cities = () => { 
	return ( arrCities, search ) => {
		const textCity = search.cities || '';
		const textCountry = search.id || '';

		return arrCities.filter( ( item ) => {
			return item.cities.toLowerCase().indexOf( textCity.toLowerCase() ) !== -1
				&& item.id.toLowerCase().indexOf( textCountry.toLowerCase() ) !== -1
		})
	}
}

export default cities;
