import React from 'react'
import WeatherIcon from '@UI/WeatherIcon'
import { getFormattedTime, getUnit } from '@features/General/index'
import Spin from '@UI/Spin'
import * as styles from './index.scss'
interface IWeatherInfo {
    description: string
    icon: string
}
interface IWeather {
    city_name: string
    ob_time: string
    temp: Number
    weather?: IWeatherInfo
}
interface IProps {
    weather: IWeather
    unit: string
    changeUnits: (e: string) => void
    isLoading: boolean
}

const CurrentWeather = (props: IProps) => {
    const { weather, unit = 'M', changeUnits, isLoading } = props

    return (
        <div className={styles['current-container']}>
            {isLoading && <Spin width={50} height="100%" />}
            <div className={styles['container-title']}>
                <p>Current Weather</p>
                <div className={styles['action']}>
                    <button className={styles[`${unit === 'M' && 'active'}`]} onClick={() => changeUnits('M')}>
                        °C
                    </button>
                    <button className={styles[`${unit === 'I' && 'active'}`]} onClick={() => changeUnits('I')}>
                        °F
                    </button>
                    <p>{getFormattedTime()}</p>
                </div>
            </div>
            <div className={styles['container-body']}>
                <div className={styles['weather-container']}>
                    <div className={styles['weather']}>
                        <WeatherIcon iconCode={weather?.weather?.icon} />
                        <div className={styles['temp']}>
                            {weather?.temp?.toString()}°<span>{getUnit[unit]}</span>
                        </div>
                    </div>
                    <div className={styles['description']}>{weather?.weather?.description}</div>
                </div>
                <div className={styles['details']}>
                    <div>
                        <span>City Name</span>
                        <span>{weather?.city_name}</span>
                    </div>
                    <div>
                        <span>Last observation time</span>
                        <span>{getFormattedTime(weather?.ob_time)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather
