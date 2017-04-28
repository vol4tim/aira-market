import _ from 'lodash'
import { START_LOAD, SET_MARKET, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS, LOAD_MY_ORDERS, SET_NAME_PROMISEE } from './actionTypes'
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
  orders: [],
  asks: [],
  bids: [],
  myOrders: [],
  token: {
    address: '',
    balance: 0,
    approve: 0
  },
  names: {}
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
      const asks = _.reduce(action.payload, (result, order) => {
        result.push(order.id);
        return result;
      }, []);
      const orders = _.filter(state.orders, { type: 'bids' });
      return { ...state, orders: [...orders, ...action.payload], asks, isLoadAsks: false }
    }

    case LOAD_BIDS_ORDERS: {
      const bids = _.reduce(action.payload, (result, order) => {
        result.push(order.id);
        return result;
      }, []);
      const orders = _.filter(state.orders, { type: 'asks' });
      return { ...state, orders: [...orders, ...action.payload], bids, isLoadBids: false }
    }

    case LOAD_MY_ORDERS: {
      return { ...state, myOrders: action.payload, isLoadMy: false }
    }

    case SET_NAME_PROMISEE: {
      const names = { ...state.names, [action.payload.address]: action.payload.name };
      return { ...state, names, isLoadMy: false }
    }

    default:
      return state;
  }
}
