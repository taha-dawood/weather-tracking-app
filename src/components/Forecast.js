import React from 'react';

const getBackgroundColor = (condition) => {
    switch (true) {
        case condition.toLowerCase().includes('sunny'):
            return '#add8e6'; // Light blue for sunny
        case condition.toLowerCase().includes('cloud'):
            return '#d3d3d3'; // Light grey for cloudy
        case condition.toLowerCase().includes('rain'):
            return '#808080'; // Dark grey for raining
        default:
            return '#fff'; // Default color
    }
};

const Forecast = ({ weatherData }) => {
    // Extract forecast data
    const forecastDays = weatherData?.forecast?.forecastday || [];

    return (
        <div style={{ display: 'flex', overflowX: 'auto' }}>
            {forecastDays.map((day, index) => (
                <div
                    key={index}
                    style={{
                        border: '1px solid #ddd',
                        padding: '10px',
                        margin: '10px',
                        borderRadius: '8px',
                        backgroundColor: getBackgroundColor(day.day.condition.text),
                    }}
                >
                    <h2>{new Date(day.date).toLocaleDateString()}</h2>
                    <p>Max Temperature: {day.day.maxtemp_c}°C</p>
                    <p>Condition: {day.day.condition.text}</p>
                    <img
                        src={day.day.condition.icon}
                        alt={day.day.condition.text}
                        style={{ width: '50px', height: '50px' }}
                    />
                    {/* Add more forecast details as needed */}
                </div>
            ))}
        </div>
    );
};

export default Forecast;
