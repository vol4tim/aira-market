import { SET_DAO_ADDRESS, FLASH_MESSAGE } from './actionTypes'

const initialState = {
  title: 'dApp Aira',
  flash_message: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, flash_message: action.payload }

    case SET_DAO_ADDRESS:
      return { ...state, dao_address: action.payload }

    default:
      return state;
  }
}
