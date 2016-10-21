const countries = () => { 
	return ( arrCountries, search ) => {
		if ( !search.id ) return arrCountries;
		let result = [];
		arrCountries.forEach( ( item ) => {
			if ( item.id.toLowerCase().indexOf( search.id.toLowerCase() ) !== -1 ) result.push(item);
		})
		return result;
	}
}

export default countries;
