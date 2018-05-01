import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import Kitties from './components/kitties'
import Layout from './components/layout'
import Gifting from './components/gifting'
import {reducers} from './redux'

import './styles/index.scss'

const store = applyMiddleware(reduxThunk)(createStore)(reducers)

const Root = () => (
  <Layout>
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <Switch>
        <Route exact path="/" component={Kitties} />
        <Route exact path="/gifting" component={Gifting} />
      </Switch>
    </HashRouter>
  </Provider>
  </Layout>
)

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)
