import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayHandler from './DisplayHandler';

const App = () => {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const handleSearch = (event) => {
		setSearch(event.target.value.toLowerCase());
		const newFilteredCountries = countries.filter((country) =>
			country['name'].toLowerCase().includes(event.target.value)
		);
		setFilteredCountries(newFilteredCountries);
		setSelectedCountry(null);
	};

	const handleSelectedCountry = (selectedCountryName) => {
		return (event) => {
			event.preventDefault();
			const newSelectedCountry = filteredCountries.find(
				(country) => country.name === selectedCountryName
			);
			setSelectedCountry(newSelectedCountry);
			setSearch('');
		};
	};

	const hook = () => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then((response) => setCountries(response.data));
	};

	useEffect(hook, []);

	return (
		<div>
			find countries <input onChange={handleSearch} value={search} />
			<div>
				<DisplayHandler
					filteredCountries={filteredCountries}
					selectedCountry={selectedCountry}
					handleSelectedCountry={handleSelectedCountry}
				/>
			</div>
		</div>
	);
};

export default App;
