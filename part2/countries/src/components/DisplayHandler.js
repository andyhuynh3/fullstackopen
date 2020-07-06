import React from 'react';
import DisplayCountry from './DisplayCountry';
import DisplayCountryOption from './DisplayCountryOption';

const DisplayHandler = ({
	filteredCountries,
	selectedCountry,
	handleSelectedCountry
}) => {
	if (filteredCountries.length === 1 || selectedCountry) {
		const country =
			filteredCountries.length === 1 ? filteredCountries[0] : selectedCountry;
		return (
			<div>
				<DisplayCountry country={country} />
			</div>
		);
	}
	if (filteredCountries.length === 0 || filteredCountries === undefined) {
		return '';
	}
	if (filteredCountries.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	}
	if (filteredCountries.length > 1) {
		return filteredCountries.map((country) => (
			<DisplayCountryOption
				country={country}
				handleSelectedCountry={handleSelectedCountry}
			/>
		));
	}
};

export default DisplayHandler;
