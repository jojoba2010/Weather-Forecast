import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { rootActions } from '@app-store/slices'
import { STATUS, getNextHour } from '@features/General'
import loadable from '@loadable/component'
import Search from '@components/search'
import Spin from '@UI/Spin'
import * as styles from './index.scss'

const CurrentWeather = loadable(() => import('@components/currentWeather'))
const WeeklyWeather = loadable(() => import('@components/weeklyWeather'))
const HourlyHistorical = loadable(() => import('@components/hourlyHistorical'))
interface ILatLon {
    lat: number
    lon: number
}
interface IGeolocationData {
    isLoading?: boolean
    error?: string
    showError?: boolean
}
const WeatherForecast = () => {
    const dispatch = useDispatch()
    const { data: currentForecast, status: statusCurrent } = useSelector(
        (state: RootState) => state.forecast.currentForecast
    )
    const { data: weeklyForecast, status: statusWeekly } = useSelector(
        (state: RootState) => state.forecast.weeklyForecast
    )
    const { data: hourlyForecast, status: statusHourly } = useSelector(
        (state: RootState) => state.forecast.hourlyForecast
    )
    const [searchText, setSearchText] = useState<string>('')
    const [selectedLatLon, setSelectedLatLon] = useState<ILatLon>(null)
    const [showWeeklyForecast, setShowWeeklyForecast] = useState<boolean>(false)
    const [units, setUnits] = useState<string>('M')
    const [geolocationData, setGeolocationData] = useState<IGeolocationData>({ isLoading: true })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async position => {
                setGeolocationData({ isLoading: false })
                const { latitude, longitude } = position.coords
                return setSelectedLatLon({ lat: latitude, lon: longitude })
            },
            e => {
                setGeolocationData({ error: e.message, isLoading: false, showError: true })
            }
        )
    }, [])

    useEffect(() => {
        if (searchText) getCurrentForecast({ city: searchText, units })
        else if (selectedLatLon) getCurrentForecast({ ...selectedLatLon, units })
    }, [selectedLatLon, units])

    useEffect(() => {
        if (showWeeklyForecast) {
            if (searchText) getWeeklyForecast({ city: searchText, units })
            else if (selectedLatLon) getWeeklyForecast({ ...selectedLatLon, units })
        }
    }, [selectedLatLon, units, showWeeklyForecast])

    const getCurrentForecast = data => {
        dispatch(
            rootActions.forecast.currentForecast.onRequest({
                ...data,
                sagaCB: {
                    onSuccess: () => {
                        if (geolocationData.showError) setGeolocationData({ showError: false })
                        if (!selectedLatLon) setSelectedLatLon(null)
                    }
                }
            })
        )
        dispatch(
            rootActions.forecast.hourlyForecast.onRequest({...data,start_date:getNextHour(1),end_date:getNextHour(12) })
        )
    }
    const getWeeklyForecast = data => {
        dispatch(rootActions.forecast.weeklyForecast.onRequest(data))
    }

    const changeUnits = (selectedUnit: string) => setUnits(selectedUnit)
    const handleSearch = useCallback(
        (text: string) => {
            setSearchText(text)
        },
        [geolocationData]
    )
    const getForecastBySearch = () => {
        if (searchText) {
            setShowWeeklyForecast(false)
            getCurrentForecast({ city: searchText, units })
        }
    }
    return (
        <div className={styles['forecast-container']}>
            {geolocationData.isLoading && <Spin width={50} opacity={0.8} height="100%" />}
            <div className={styles['header']}>
                <Search getForecastBySearch={getForecastBySearch} onSearch={handleSearch} />
                <div className={styles['action']}>
                    <button
                        onClick={() => {
                            if (searchText || selectedLatLon)
                                getCurrentForecast({
                                    ...(searchText ? { city: searchText } : { ...selectedLatLon }),
                                    units
                                })
                        }}
                        disabled={statusCurrent === STATUS.RUNNING || geolocationData.showError}
                    >
                        {statusCurrent === STATUS.RUNNING ? (
                            <Spin position="relative" color="#fff" width={50} />
                        ) : (
                            'Refresh Forecast'
                        )}
                    </button>
                    <button
                        onClick={() => setShowWeeklyForecast(true)}
                        disabled={statusWeekly === STATUS.RUNNING || geolocationData.showError}
                    >
                        {statusWeekly === STATUS.RUNNING ? (
                            <Spin position="relative" color="#fff" width={50} />
                        ) : (
                            'Weekly Forecast'
                        )}
                    </button>
                </div>
            </div>
            {geolocationData.showError && geolocationData.error && (
                <div className={styles['error']}>
                    <span>{geolocationData.error}</span>
                </div>
            )}
            {currentForecast?.data?.[0] && (
                <>
                    <CurrentWeather
                        unit={units}
                        weather={currentForecast.data[0]}
                        changeUnits={changeUnits}
                        isLoading={statusCurrent === STATUS.RUNNING}
                    />
                    <HourlyHistorical unit={units} isLoading={statusHourly === STATUS.RUNNING} hourlyForecast={hourlyForecast?.data}/>
                    {showWeeklyForecast && weeklyForecast?.data?.length ? (
                        <WeeklyWeather
                            unit={units}
                            weather={weeklyForecast.data}
                            isLoading={statusWeekly === STATUS.RUNNING}
                        />
                    ) : null}
                </>
            )}
        </div>
    )
}
export default WeatherForecast
