import { START_LOAD, SET_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS, LOAD_MY_ORDERS } from './actionTypes'
import { MARKET_DEFAULT_ADDR } from '../../config/config'

const initialState = {
  market: MARKET_DEFAULT_ADDR,
  isLoad: false,
  asks: [],
  bids: [],
  myOrders: [],
  token: {
    address: '',
    balance: 0,
    approve: 0
  }
}

export default function market(state = initialState, action) {
  switch (action.type) {
    case START_LOAD: {
      return { ...state, isLoad: true }
    }

    case SET_MARKET: {
      return { ...state, market: action.payload, isLoad: true }
    }

    case LOAD_TOKEN: {
      return { ...state, token: { ...action.payload }, isLoad: false }
    }

    case LOAD_ASKS_ORDERS: {
      return { ...state, ...action.payload, isLoad: false }
    }

    case LOAD_BIDS_ORDERS: {
      return { ...state, ...action.payload, isLoad: false }
    }

    case LOAD_MY_ORDERS: {
      return { ...state, ...action.payload, isLoad: false }
    }

    default:
      return state;
  }
}
