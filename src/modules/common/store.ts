import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagasMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'

import { env } from 'decentraland-commons'
import { createTransactionMiddleware } from '@beland/dapps/dist/modules/transaction/middleware'
import { createStorageMiddleware } from '@beland/dapps/dist/modules/storage/middleware'
import { createAnalyticsMiddleware } from '@beland/dapps/dist/modules/analytics/middleware'
import { configure as configureAnalytics } from '@beland/dapps/dist/modules/analytics/utils'
import { getOpenModals } from '@beland/dapps/dist/modules/modal/selectors'
import { openModal } from '@beland/dapps/dist/modules/modal/actions'

import { isDevelopment } from 'lib/environment'
import { createRootReducer } from './reducer'
import { rootSaga } from './sagas'
import { RootState, RootStore } from './types'
import { DESTROY_IDENTITY, GENERATE_IDENTITY_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS } from 'modules/identity/actions'

const builderVersion = require('../../../package.json').version

configureAnalytics({
  transformPayload: payload => {
    if (typeof payload === 'string' || payload === undefined) return payload
    return { ...payload, version: builderVersion }
  }
})

// @ts-ignore: Dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? // prettier-ignore
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    stateSanitizer: (state: RootState) => {
      return state
    }
  })
  : compose

const history = createBrowserHistory()
const rootReducer = createRootReducer(history)

const historyMiddleware = routerMiddleware(history)
const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  predicate: () => isDevelopment,
  collapsed: () => true
})
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware({
  storageKey: 'belandSale',
  paths: [
    ['auth', 'data'],
    ['identity', 'data']
  ],
  actions: [
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GENERATE_IDENTITY_SUCCESS,
    DESTROY_IDENTITY
  ],
  onError: (err, store) => {
    const isQuotaModalOpen = !!getOpenModals(store.getState())['QuotaExceededModal']
    if (err instanceof DOMException && err.name === 'QuotaExceededError' && !isQuotaModalOpen) {
      store.dispatch(openModal('QuotaExceededModal'))
    }
  }
})
const transactionMiddleware = createTransactionMiddleware()
const analyticsMiddleware = createAnalyticsMiddleware(env.get('REACT_APP_SEGMENT_API_KEY'))

const middlewares = [historyMiddleware, sagasMiddleware, loggerMiddleware, storageMiddleware, analyticsMiddleware, transactionMiddleware]

const middleware = applyMiddleware(...middlewares)

const enhancer = composeEnhancers(middleware)
const store = createStore(rootReducer, enhancer) as RootStore


sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (isDevelopment) {
  const _window = window as any
  _window.getState = store.getState
}



export { store, history }
