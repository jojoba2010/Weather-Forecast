import { combineReducers } from 'redux'
import { forecastReducers, forecastActions } from '@app-store/slices/forecast'
export const rootReducer = combineReducers({
  forecast: forecastReducers
})

export const rootActions = {
  forecast: forecastActions
 }