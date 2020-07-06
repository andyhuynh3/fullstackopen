import React from 'react';

const DisplayCountryOption = ({ country, handleSelectedCountry }) => {
	return (
		<p key={country['name']}>
			{country['name']}{' '}
			<button onClick={handleSelectedCountry(country['name'])}>show</button>
		</p>
	);
};

export default DisplayCountryOption;
