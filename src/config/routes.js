import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { Start } from '../routes/start'
import * as Market from '../routes/market'
import * as Air from '../routes/air'
import * as Liability from '../routes/liability'

export const routes = () =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Market.Main} />
      <Route path="/market" component={Air.Main} />
      <Route path="/change-market" component={Start} />
      <Route path="/liability" component={Liability.Page}>
        <IndexRoute component={Liability.Main} />
        <Route path=":address" component={Liability.Module} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)
