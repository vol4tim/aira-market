import Notifications from 'react-notification-system-redux';
import { SET_DAO_ADDRESS/* , FLASH_MESSAGE*/ } from './actionTypes'

export function setDaoAddress(address) {
  return {
    type: SET_DAO_ADDRESS,
    payload: address
  }
}

export function flashMessage(message) {
  return (dispatch) => {
    const notificationOpts = {
      // title: 'Hey, it\'s good to see you!',
      message,
      position: 'tr',
      autoDismiss: 10
    };
    dispatch(Notifications.info(notificationOpts))
    // dispatch({
    //   type: FLASH_MESSAGE,
    //   payload: message
    // })
  }
}
