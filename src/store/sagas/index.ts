import { all } from '@redux-saga/core/effects'
import forecastSaga from './forecast'
function* rootSaga() {
    yield all([
	...forecastSaga,
	])
}

export default rootSaga