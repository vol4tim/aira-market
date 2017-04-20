/* eslint  global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(logger);
}

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
