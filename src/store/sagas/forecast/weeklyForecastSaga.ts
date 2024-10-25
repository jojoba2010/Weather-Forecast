import { Action } from 'redux'
import { put, takeLatest } from 'redux-saga/effects'
import { rootActions } from '@app-store/slices'
import axios from '@utils/request'
import { IWeeklyForecastPayload } from '@app-store/slices/forecast/weeklyForecast'
import { API_KEY } from '@utils/constants/requestConstants'

interface TaskAction extends Action {
    payload: IWeeklyForecastPayload
}

const { onRequest, onSuccess, onFailure } = rootActions.forecast.weeklyForecast

function* weeklyForecastSagaTask({ payload }: TaskAction) {
    try {
        const response = yield axios.get('forecast/daily', {
            params: {...payload,key:API_KEY,days:7}
        })
        if (response) {
            yield put(onSuccess(response))
            yield payload.sagaCB?.onSuccess(response)
        }
    } catch (error) {
        yield put(onFailure(error))
    }
}

function* weeklyForecastSaga(): any {
    yield takeLatest<TaskAction>(onRequest, weeklyForecastSagaTask)
}

export default weeklyForecastSaga
