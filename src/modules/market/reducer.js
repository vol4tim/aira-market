import { START_LOAD, SET_MARKET, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS, LOAD_MY_ORDERS } from './actionTypes'
import { MARKET_DEFAULT_ADDR } from '../../config/config'

const initialState = {
  market: MARKET_DEFAULT_ADDR,
  info: {
    name: ''
  },
  isLoad: false,
  isLoadMarket: false,
  isLoadToken: false,
  isLoadAsks: false,
  isLoadBids: false,
  isLoadMy: false,
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
      if (action.payload === 'token') {
        return { ...state, isLoadToken: true }
      } else if (action.payload === 'asks') {
        return { ...state, isLoadAsks: true }
      } else if (action.payload === 'bids') {
        return { ...state, isLoadBids: true }
      } else if (action.payload === 'my') {
        return { ...state, isLoadMy: true }
      } else if (action.payload === 'market') {
        return { ...state, isLoadMarket: true }
      }
      return { ...state, isLoad: true }
    }

    case SET_MARKET: {
      return { ...state, market: action.payload, isLoad: true }
    }

    case LOAD_MARKET: {
      return { ...state, info: { ...action.payload }, isLoadMarket: false }
    }

    case LOAD_TOKEN: {
      return { ...state, token: { ...action.payload }, isLoadToken: false }
    }

    case LOAD_ASKS_ORDERS: {
      return { ...state, ...action.payload, isLoadAsks: false }
    }

    case LOAD_BIDS_ORDERS: {
      return { ...state, ...action.payload, isLoadBids: false }
    }

    case LOAD_MY_ORDERS: {
      return { ...state, ...action.payload, isLoadMy: false }
    }

    default:
      return state;
  }
}
