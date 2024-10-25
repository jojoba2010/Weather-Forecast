import { STATUS } from '@features/General'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState, ISagaCb } from '@typings/requestPayloads'

export interface IHourlyForecastPayload extends ISagaCb {
    start_date?: string
    end_date?: string
    lat?: string
    lon?: string
    city?: string
    unit: string
}

const initialState: IState = {
    status: STATUS.IDLE,
    data: null,
    errors: null
}

const hourlyForecastSlice = createSlice({
    name: 'hourly-weather-forecast',
    initialState,
    reducers: {
        onRequest(state, action: PayloadAction<IHourlyForecastPayload>) {
            state.status = STATUS.RUNNING
        },
        onSuccess(state, action) {
            state.status = STATUS.READY
            state.data = action.payload
        },
        onFailure(state, action) {
            state.status = STATUS.ERROR
            state.errors = action.payload
        }
    }
})

export const hourlyForecastActions = hourlyForecastSlice.actions
export default hourlyForecastSlice.reducer
