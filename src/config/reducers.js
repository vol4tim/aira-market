import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import * as modules from '../modules/reducers';

export default combineReducers({
  ...modules,
  notifications
})
