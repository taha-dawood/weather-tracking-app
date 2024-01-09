import React from 'react';
import Graph from './Graph';

const AirQualitySafety = ({ weatherData }) => {
    const getAirQualityData = (weatherData) => {
        const forecastDays = weatherData?.forecast?.forecastday;

        if (!forecastDays || forecastDays.length === 0) {
            return [];
        }

        return forecastDays.map((day) => {
            const airQuality = day?.day?.air_quality;

            return {
                date: day.date,
                airQuality: airQuality || {},
            };
        });
    };

    return (
        <div>
            <div
                style={{
                    backgroundColor: 'black',
                    flex: '1',
                    padding: '10px',
                    margin: '10px',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <p style={{ fontWeight: 'bold' }}>Air Quality in Metrics</p>
                <Graph airQualityData={getAirQualityData(weatherData)} />
            </div>
        </div>
    );
};

export default AirQualitySafety;