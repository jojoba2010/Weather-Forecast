import React from 'react'
import { getUnit, getDayName, getYearMonth } from '@features/General/index'
import Spin from '@UI/Spin'
import WeatherIcon from '@UI/WeatherIcon'
import * as styles from './index.scss'
interface IWeatherInfo {
    icon: string
    description: string
}
interface IWeather {
    datetime: string
    temp: Number
    weather?: IWeatherInfo
}
interface IProps {
    weather: IWeather[]
    unit: string
    isLoading: boolean
}

const WeeklyWeather = (props: IProps) => {
    const { weather, unit = 'M', isLoading } = props
    return (
        <div className={styles['weekly-container']}>
            {isLoading && <Spin width={50} height="100%" />}
            <div className={styles['container-title']}>
                <p>7-Day Weather Forecast</p>
            </div>
            <div className={styles['container-body']}>
                {weather?.map((day, index) => (
                    <div key={index} className={styles['daily-item']}>
                        <div className={styles['date']}>
                            <p className={styles['day']}>{getDayName(day?.datetime)}</p>
                            <p>{getYearMonth(day?.datetime)}</p>
                        </div>
                        <WeatherIcon iconCode={day.weather.icon} width={40} />
                        <div className={styles['temp']}>
                            {day?.temp?.toString()}°<span>{getUnit[unit]}</span>
                        </div>
                        <div className={styles['description']}>{day?.weather?.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeeklyWeather
