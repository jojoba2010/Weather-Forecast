import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import loadable from '@loadable/component'
import ErrorBoundary from '@components/errorBoundary'
import PageLoading from '@UI/PageLoading'
import store from '@app-store/store'
import { Provider } from 'react-redux'
export const loadableOptions = { fallback: <PageLoading /> }
export const history = createBrowserHistory()

const WeatherForecast = loadable(() => import('@pages/weatherForecast'), loadableOptions)
function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
            <ErrorBoundary>
                <Switch>
                    <Route path="*" component={WeatherForecast} />
                </Switch>
                </ErrorBoundary>
            </Router>
        </Provider>
    )
}

export default App
