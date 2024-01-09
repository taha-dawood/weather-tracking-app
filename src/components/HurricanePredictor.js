import React from 'react';

const StudentSafetyAdvisory = ({ weatherData }) => {
    const isSafeToGoOutside = (likelihood) => {
        const safetyThreshold = 50;
        return likelihood < safetyThreshold;
    };

    const getHealthActivities = (weatherData) => {
        const activities = [];

        // Check wind speed for health suggestions
        const windSpeed_kph = weatherData?.forecast?.forecastday[0]?.day?.maxwind_kph || 0;
        if (windSpeed_kph < 20) {
            activities.push({
                name: 'Gentle Walk or Yoga',
                metrics: 'Wind speed below 20 km/h',
            });
        } else if (windSpeed_kph < 40) {
            activities.push({
                name: 'Light Exercise or Stretching',
                metrics: 'Wind speed between 20 km/h and 40 km/h',
            });
        } else {
            activities.push({
                name: 'Consider Indoor Exercise',
                metrics: 'Wind speed above 40 km/h. It may be too windy for outdoor exercise.',
            });
        }

        // Check sunlight for health suggestions
        const isSunny = weatherData?.current?.condition?.text.toLowerCase().includes('sunny');
        if (isSunny) {
            activities.push({
                name: 'Vitamin D Break (10-15 minutes)',
                metrics: 'Sunny weather',
            });
        }

        // Check temperature for health suggestions
        const temperature_C = weatherData?.current?.temp_c || 0;
        if (temperature_C >= 25) {
            activities.push({
                name: 'Stay Hydrated and Cool',
                metrics: 'Temperature above 25°C',
            });
        } else if (temperature_C >= 15) {
            activities.push({
                name: 'Enjoy Outdoor Walks or Light Jogging',
                metrics: 'Temperature between 15°C and 25°C',
            });
        } else {
            activities.push({
                name: 'Consider Indoor Activities',
                metrics: 'Temperature below 15°C. It may be too cold for extended outdoor activities.',
            });
        }

        return activities;
    };

    const getDressRecommendation = (temperature_C) => {
        if (temperature_C >= 25) {
            return "Wear light and breathable clothing to stay cool.";
        } else if (temperature_C >= 15) {
            return "Dress in layers for varying temperatures. Consider a light jacket.";
        } else {
            return "Bundle up with warm layers. Don't forget a coat or sweater.";
        }
    };

    return (
        <div>
            {weatherData && (
                <div
                    style={{
                        backgroundColor: '#67b7d1',
                        flex: '1',
                        padding: '10px',
                        margin: '10px',
                        textAlign: 'left',
                        color: 'white',
                    }}
                >
                    <div style={{ marginTop: '20px' }}>
                        <h3
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}
                        >
                            BU Student Health Advisory
                        </h3>
                        <div>
                            {isSafeToGoOutside(weatherData.forecast.forecastday[0].day.maxwind_kph) ? (
                                <p>Health Activities Report:</p>
                            ) : (
                                <p>Caution: The weather conditions may impact your well-being. Consider the following health recommendations.</p>
                            )}
                            <h4 style={{ fontWeight: 'bold' }}>Recommended Health Activities:</h4>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {getHealthActivities(weatherData).map((activity, index) => (
                                    <li key={index} style={{ margin: '10px 0px' }}>
                                        <div style={{ display: 'flex', alignItems: 'left' }}>
                                            <span style={{ marginRight: '10px' }}>🌞</span>
                                            <span style={{ fontWeight: 'bold' }}>{activity.name}</span>
                                        </div>
                                        <p>{activity.metrics}</p>
                                    </li>
                                ))}
                            </ul>
                            <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Dress Recommendation:</p>
                            <p>{getDressRecommendation(weatherData.current.temp_c)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentSafetyAdvisory;
