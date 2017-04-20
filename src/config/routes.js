import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { Start } from '../routes/start'
import * as Market from '../routes/market'
import * as Liability from '../routes/liability'

export const routes = () =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Start} />
      <Route path="/market" component={Market.Page}>
        <IndexRoute component={Market.Main} />
      </Route>
      <Route path="/liability" component={Liability.Page}>
        <IndexRoute component={Liability.Main} />
        <Route path=":address" component={Liability.Module} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)
