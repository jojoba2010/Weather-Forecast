import { STATUS } from '@features/General'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IState, ISagaCb } from '@typings/requestPayloads'

export interface ICurrentForecastPayload extends ISagaCb {
        lat?: string
        lon?: string
        city?: string
        units: string
}

const initialState: IState = {
    status: STATUS.IDLE,
    data: null,
    errors: null
}

const currentForecastSlice = createSlice({
    name: 'current-weather-forecast',
    initialState,
    reducers: {
        onRequest(state,action: PayloadAction<ICurrentForecastPayload>) {
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

export const currentForecastActions = currentForecastSlice.actions
export default currentForecastSlice.reducer
