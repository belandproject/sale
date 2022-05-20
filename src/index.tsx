import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ToastProvider from '@beland/dapps/dist/providers/ToastProvider'
import WalletProvider from '@beland/dapps/dist/providers/WalletProvider'

import { store, history } from 'modules/common/store'
import Routes from 'routing'

import './themes'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <WalletProvider>
        <ToastProvider>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </ToastProvider>
      </WalletProvider>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root')
)