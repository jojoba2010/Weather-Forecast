import { combineReducers } from 'redux'
import currentForecastReducer, { currentForecastActions } from '@app-store/slices/forecast/currentForecast'
import weeklyForecastReducer, { weeklyForecastActions } from '@app-store/slices/forecast/weeklyForecast'
import hourlyForecastReducer, { hourlyForecastActions } from '@app-store/slices/forecast/hourlyForecast'
export const forecastReducers = combineReducers({
    currentForecast: currentForecastReducer,
    weeklyForecast: weeklyForecastReducer,
    hourlyForecast: hourlyForecastReducer
})

export const forecastActions = {
    currentForecast: currentForecastActions,
    weeklyForecast: weeklyForecastActions,
    hourlyForecast: hourlyForecastActions
}
