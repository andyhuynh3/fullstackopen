import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHERSTACK_API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;

const DisplayCountry = ({ country }) => {
	const [weatherData, setWeatherData] = useState(null);

	useEffect(() => {
		const hook = async () => {
			const response = await axios.get('http://api.weatherstack.com/current', {
				params: {
					access_key: WEATHERSTACK_API_KEY,
					query: country['capital']
				}
			});
			setWeatherData(response.data);
		};
		hook();
	}, [country]);

	if (weatherData) {
		return (
			<div>
				<h1>{country['name']}</h1>
				<p>capital {country['capital']}</p>
				<p>population {country['population']}</p>
				<h2>languages</h2>
				<ul>
					{country['languages'].map((language) => (
						<li key={language.name}>{language.name}</li>
					))}
				</ul>
				<p>
					<img
						src={country['flag']}
						alt='flag'
						style={{ height: '100px', width: '150px' }}
					></img>
				</p>
				<h2>Weather in {country['capital']}</h2>
				<p>
					<b>temperature:</b> {weatherData['current']['temperature']} Celcius
				</p>
				<p>
					<img
						src={weatherData['current']['weather_icons'][0]}
						alt='weather_icon'
						style={{ height: '75px', width: '75px' }}
					></img>
				</p>
				<p>
					<b>wind: </b> {weatherData['current']['wind_speed']} mph direction{' '}
					{weatherData['current']['wind_dir']}
				</p>
			</div>
		);
	}
	return null;
};

export default DisplayCountry;
