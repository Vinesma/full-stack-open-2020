import React, { useState, useEffect } from 'react';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios
            .get(`http://wttr.in/${country}?format=j1`)
            .then(response => {
                const weatherData = response.data.current_condition[0]
                setWeather({
                    temperature: weatherData.temp_C,
                    temperature_F: weatherData.temp_F,
                    description: weatherData.weatherDesc[0].value,
                });
            });
    }, [country]);

    return (
        <div>
            <p>C°: {weather.temperature}</p>
            <p>F°: {weather.temperature_F}</p>
            <p>{weather.description}</p>
        </div>
    )
}

export default Weather;
