// Graph.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Graph = (airQualityData) => {
    if (!airQualityData || !airQualityData["airQualityData"]) {
        // Return an empty array or handle the case where airQualityData is not available or does not have the expected structure
        return [];
    }

    const graphData = airQualityData["airQualityData"].map((day, index) => {
        if (day && day.airQuality) {
            return {
                name: day.date,
                CO: day.airQuality.co,
                NO2: day.airQuality.no2,
                O3: day.airQuality.o3,
                SO2: day.airQuality.so2,
                PM2: day.airQuality.pm2_5,
                PM10: day.airQuality.pm10,
            };
        }
        return null;
    }).filter(Boolean);

    console.log(graphData);


    return (
        <LineChart width={800} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Create a Line component for each air quality parameter */}
            <Line type="monotone" dataKey="CO" stroke="#8884d8" />
            <Line type="monotone" dataKey="NO2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="O3" stroke="#ffc658" />
            <Line type="monotone" dataKey="SO2" stroke="#8884d8" />
            <Line type="monotone" dataKey="PM2_5" stroke="#82ca9d" />
            <Line type="monotone" dataKey="PM10" stroke="#ffc658" />
        </LineChart>
    );
};
export default Graph;