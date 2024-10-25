import { Action } from 'redux'
import { put, takeLatest } from 'redux-saga/effects'
import { rootActions } from '@app-store/slices'
import axios from '@utils/request'
import { ICurrentForecastPayload } from '@app-store/slices/forecast/currentForecast'
import { API_KEY } from '@utils/constants/requestConstants'

interface TaskAction extends Action {
    payload: ICurrentForecastPayload
}

const { onRequest, onSuccess, onFailure } = rootActions.forecast.currentForecast

function* currentForecastSagaTask({ payload }: TaskAction) {
    try {
        const response = yield axios.get('current', {
            params: {...payload,key:API_KEY}
        })
        if (response) {
            yield put(onSuccess(response))
            if (payload.sagaCB?.onSuccess) yield payload.sagaCB.onSuccess(response)
        }
    } catch (error) {
        yield put(onFailure(error))
    }
}

function* currentForecastSaga(): any {
    yield takeLatest<TaskAction>(onRequest, currentForecastSagaTask)
}

export default currentForecastSaga
