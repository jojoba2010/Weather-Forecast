import currentForecastSaga from './currentForecastSaga'
import weeklyForecastSaga from './weeklyForecastSaga'
import hourlyForecastSaga from './hourlyForecastSaga'

const forecastSaga = [currentForecastSaga(), weeklyForecastSaga(), hourlyForecastSaga()]

export default forecastSaga
