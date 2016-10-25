const countries = () => { 
	return ( arrCountries, search ) => {
		const textCountry = search.id || '';

		if ( !search.id ) return arrCountries;
		return arrCountries.filter( ( item ) => {
			return item.id.toLowerCase().indexOf( textCountry.toLowerCase() ) !== -1
		})
	}
}

export default countries;

