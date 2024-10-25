import React from 'react';

const WeatherIcon = ({ iconCode,width=88 }) => {
    const iconUrl = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
    return <img src={iconUrl} alt="Weather Icon" style={{width}}/>;
};

export default WeatherIcon;
