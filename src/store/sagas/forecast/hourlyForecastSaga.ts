import { Action } from 'redux'
import { put, takeLatest } from 'redux-saga/effects'
import { rootActions } from '@app-store/slices'
import axios from '@utils/request'
import { IHourlyForecastPayload } from '@app-store/slices/forecast/hourlyForecast'
import { API_KEY } from '@utils/constants/requestConstants'

interface TaskAction extends Action {
    payload: IHourlyForecastPayload
}

const { onRequest, onSuccess, onFailure } = rootActions.forecast.hourlyForecast

function* hourlyForecastSagaTask({ payload }: TaskAction) {
    try {
        const response = yield axios.get('history/hourly', {
            params: {...payload,key:API_KEY}
        })
        if (response) {
            yield put(onSuccess(response))
            yield payload.sagaCB?.onSuccess(response)
        }
    } catch (error) {
        yield put(onFailure(error))
    }
}

function* hourlyForecastSaga(): any {
    yield takeLatest<TaskAction>(onRequest, hourlyForecastSagaTask)
}

export default hourlyForecastSaga
