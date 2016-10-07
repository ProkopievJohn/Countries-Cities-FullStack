export default function setCountry (countryName)	{
	return	{
		type: 'SET_COUNTRY',
		countries: countryName
	}
}