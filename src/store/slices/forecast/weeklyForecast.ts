import { STATUS } from '@features/General'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState, ISagaCb } from '@typings/requestPayloads'

export interface IWeeklyForecastPayload extends ISagaCb {
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

const weeklyForecastSlice = createSlice({
    name: 'weekly-weather-forecast',
    initialState,
    reducers: {
        onRequest(state,action: PayloadAction<IWeeklyForecastPayload>) {
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

export const weeklyForecastActions = weeklyForecastSlice.actions
export default weeklyForecastSlice.reducer
