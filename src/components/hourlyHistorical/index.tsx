import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Spin from '@UI/Spin'
import { getFormattedTime, getUnit } from '@features/General/index'
import WeatherIcon from '@UI/WeatherIcon'
import * as styles from './index.scss'
import 'swiper/css'

interface IWeatherInfo {
    icon: string
}
interface IHourlyForecast {
    timestamp_utc: string
    weather: IWeatherInfo
    temp: Number
}
interface IProps {
    isLoading: boolean
    hourlyForecast: IHourlyForecast[]
    unit: string
}
const HourlyHistorical = (props: IProps) => {
    const { isLoading, hourlyForecast, unit } = props
    return (
        <div className={styles['historical-container']}>
            {isLoading && <Spin width={50} height="100%" />}
            <div className={styles['container-title']}>
                <p>Hourly Weather</p>
            </div>
            <div className={styles['container-body']}>
                <Swiper
                    spaceBetween={10}
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 6 }
                    }}
                    freeMode
                    centeredSlides
                    grabCursor
                    centeredSlidesBounds
                >
                    {hourlyForecast?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles['item']}>
                                <p>{getFormattedTime(item.timestamp_utc, false)}</p>
                                <WeatherIcon iconCode={item?.weather?.icon} width={40} />
                                <p>
                                    {item?.temp?.toString()}°<span>{getUnit[unit]}</span>
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default HourlyHistorical
